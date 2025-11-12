# GitHub Copilot Instructions

This is a React-based park & ride application consuming HSL (Helsinki Regional Transport) parking facility data through Fintraffic's GraphQL API.

## Architecture Overview

**React Implementation**: `/react-app/` - React 19 with Vite, Apollo Client, TypeScript, Tailwind CSS

The app consumes the GraphQL API at `https://parking.fintraffic.fi/proxy/graphql/` for real-time parking availability data.

## GraphQL Data Flow Pattern

The app follows a specific three-stage GraphQL pattern:

1. **Facilities Query**: Fetch basic facility metadata (name, capacity, status)
2. **Utilization Query**: Fetch real-time availability data for each facility (may return multiple usage types)
3. **Details Query**: Fetch address information from facility ports

```typescript
// Stage 1: Get facility list
GET_FACILITIES -> facilities { id, name, builtCapacity, status }

// Stage 2: Get real-time data for each facility
GET_FACILITY -> facilityUtilization { facilityId, spacesAvailable, capacity, usage, openNow, timestamp }

// Stage 3: Get address details
GET_FACILITY_DETAILS -> facilityDetails { ports { address { streetAddress, city } } }
```

**Critical Pattern**: The `facilityUtilization` query returns **arrays** for facilities with multiple usage types (COMMERCIAL, PARK_AND_RIDE, etc.). Each usage type should be treated as a separate entry:

```typescript
// Handle multiple usage types by creating separate entries
const dataArray = Array.isArray(facilityData) ? facilityData : facilityData ? [facilityData] : [];

return dataArray.map((data) => ({
  id: `${facility.id}-${data.usage}`,
  name: facility.name.fi,
  spacesAvailable: data.spacesAvailable,
  capacity: data.capacity,
  usage: data.usage,
  timestamp: data.timestamp,
  address: getUniqueAddresses(facilityDetails.ports),
}));
```

**Address Handling**: The `facilityDetails` query can return multiple ports with different addresses. Extract unique addresses and join them with " / ":

```typescript
const getUniqueAddresses = (ports: Port[]): string => {
  const addressStrings = ports
    .map((port) => {
      const street = port.address?.streetAddress?.fi || "";
      const city = port.address?.city?.fi || "";
      return street && city ? `${street}, ${city}` : street || city;
    })
    .filter(Boolean);

  const uniqueAddresses = [...new Set(addressStrings)];
  return uniqueAddresses.join(" / ");
};
```

## Predefined Area Configuration

Facilities are organized into hardcoded area groups with specific IDs (defined in `react-app/src/hooks/useFacilities.ts`):

- **Area 001**: Metro (Länsi) - IDs: `[1286, 1167, 1233, 992, 1006, 1009, 990, 755, 619]`
- **Area 002**: Metro (Itä) - IDs: `[512, 517, 1091, 1031, 507, 497, 1090]`
- **Area 003**: Lähijuna (Länsi) - IDs: `[473]`
- **Area 004**: Lähijuna (Pohjoinen) - IDs: `[751, 747, 738, 1, 308, 303, 41]`

## React Implementation Patterns

### Custom Hooks Architecture
- **useFacilities**: Base hook using Apollo Client's `useQuery` for facility list
- **useFacility**: Hook for single facility utilization data
- **useFacilityList**: Fetches facilities with utilization and details for a given area
- **useAllFacilityDetails**: Fetches all area configurations with real-time data
- **useAreaFacilities**: Fetches specific area with caching and auto-refresh
- **useFavorites**: localStorage-based favorites management

### Data Fetching Pattern
```typescript
// 1. Fetch facilities metadata
const { facilities, loading } = useFacilities({ statuses: ["IN_OPERATION"] });

// 2. For each facility, fetch utilization + details in parallel
const [utilizationResponse, detailsResponse] = await Promise.all([
  fetch(/* facilityUtilization query */),
  fetch(/* facilityDetails query */)
]);

// 3. Create separate entries for each usage type
const items = facilitiesData.flatMap(facility =>
  facility.utilizationData.map(usage => ({
    id: `${facility.id}-${usage.usage}`,
    // ... merge all data
  }))
);
```

### Caching Strategy
- **Cache Key Pattern**: Uses cache keys like `all_facility_details` and `area_facility_{areaId}`
- **TTL**: 15-minute cache duration (managed by `cacheUtils`)
- **Auto-refresh**: 1-minute interval for real-time updates
- **Cache-first**: Check cache before fetching, then set up auto-refresh

### State Management
- Local state with `useState` for complex data flows
- `useEffect` for data fetching and auto-refresh intervals
- Apollo Client cache for GraphQL query results
- localStorage for favorites and cache storage

## Type System

Key interfaces defined in `react-app/src/types/index.ts`:

```typescript
interface FacilityListItem {
  id: number | string;           // Composite ID: "facilityId-usage"
  name: string;                  // Facility name in Finnish
  builtCapacityCar?: number;     // Total built capacity
  builtCapacityElectricCar?: number;
  spacesAvailable?: number;      // Current available spaces
  capacity?: number;             // Capacity for this usage type
  usage?: string;                // COMMERCIAL, PARK_AND_RIDE, etc.
  timestamp?: string;            // Formatted timestamp
  address?: string;              // Unique addresses joined by " / "
}

interface FacilityList {
  listName?: string;
  areaId?: string;
  items: FacilityListItem[];
}

interface Address {
  streetAddress: LocalizedObject;
  city: LocalizedObject;
}

interface Port {
  address: Address;
}
```

## UI Components

### Component Structure
- **FacilitiesList**: Main list component with usage badges and address display
- **FavoritesFacilities**: Favorites view with star toggle functionality
- **Timestamp**: Reusable timestamp display component
- **CookieBanner**: Cookie consent banner

### Styling Patterns
- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first with sm:/md:/lg: breakpoints
- **Color Coding**: Green/yellow/red indicators for availability
- **Usage Badges**: Rounded pills for COMMERCIAL (Kaupallinen) and PARK_AND_RIDE (Liityntä)

## Development Commands

```bash
cd react-app
npm install             # Install dependencies
npm run dev             # Serve at localhost:5173
npm run build           # Production build
npm run preview         # Preview production build
npm run lint            # Run ESLint
```

## Environment Configuration

Configuration in `react-app/src/config/environment.ts`:
- API URL: `https://parking.fintraffic.fi/proxy/graphql/`
- Development/production flags

Apollo Client setup in `react-app/src/lib/apollo-client.ts`:
- Cache configuration
- GraphQL endpoint
- Error handling

## Context7 Integration

Per `CLAUDE.md`: Always use Context7 MCP tools for library documentation and setup without explicit request.

## Key Files for Reference

- **GraphQL queries**: `react-app/src/graphql/queries.ts`
- **Custom hooks**: `react-app/src/hooks/useFacilities.ts`
- **Type definitions**: `react-app/src/types/index.ts`
- **Apollo setup**: `react-app/src/lib/apollo-client.ts`
- **Cache utilities**: `react-app/src/utils/cache.ts`
- **Main components**: `react-app/src/components/FacilitiesList.tsx`
- **Pages**: `react-app/src/pages/Facilities.tsx`, `AreaFacilities.tsx`

## Common Pitfalls to Avoid

1. **Don't sum usage types**: Each usage type (COMMERCIAL, PARK_AND_RIDE) should be a separate entry, not summed
2. **Handle array responses**: `facilityUtilization` and `facilityDetails.ports` return arrays
3. **Use composite IDs**: IDs should be `"facilityId-usage"` format for unique identification
4. **Flatten results**: When mapping facilities to usage types, remember to `.flat()` the results
5. **Cache invalidation**: Auto-refresh runs every 1 minute, cache expires after 15 minutes
6. **Address deduplication**: Multiple ports may have duplicate addresses - use `Set` to deduplicate
