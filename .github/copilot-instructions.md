# GitHub Copilot Instructions

This is a dual-framework park & ride application consuming HSL (Helsinki Regional Transport) parking facility data through Fintraffic's GraphQL API.

## Architecture Overview

**Dual Implementation**: Two parallel implementations exist:
- **Angular** (main): `/src/` - Angular 16 with RxJS, Apollo Angular, SCSS
- **React** (experimental): `/react-app/` - React 19 with Vite, Apollo Client, TypeScript

Both consume the same GraphQL API at `https://parking.fintraffic.fi/proxy/graphql/` and share identical type definitions and queries.

## GraphQL Data Flow Pattern

The app follows a specific two-stage GraphQL pattern:

1. **Facilities Query**: Fetch basic facility metadata (name, capacity, status)
2. **Utilization Query**: Fetch real-time availability data for each facility

```typescript
// Stage 1: Get facility list
GET_FACILITIES -> facilities { id, name, builtCapacity, status }
// Stage 2: Get real-time data for each facility
GET_FACILITY -> facilityUtilization { spacesAvailable, usage, openNow }
```

**Critical Pattern**: The `facilityUtilization` query sometimes returns arrays, sometimes single objects. Always handle both:

```typescript
// Both Angular and React implementations do this
let facilityData = response.data?.facilityUtilization;
if (Array.isArray(facilityData) && facilityData.length > 0) {
  facilityData = facilityData[0];
}
```

## Predefined Area Configuration

Facilities are organized into hardcoded area groups with specific IDs:

- **Area 001**: Metro (Länsi) - IDs: `[1286, 1167, 1233, 992, 1006, 1009, 990, 755, 619]`
- **Area 002**: Metro (Itä) - IDs: `[512, 517, 1091, 1031, 507, 497, 1090]`  
- **Area 003**: Lähijuna (Länsi) - IDs: `[473]`
- **Area 004**: Lähijuna (Pohjoinen) - IDs: `[751, 747, 738, 1, 308, 303, 41]`

These area configurations appear in both Angular service (`src/app/services/facility-service.ts`) and React hooks (`react-app/src/hooks/useFacilities.ts`).

## Framework-Specific Patterns

### Angular Implementation
- **Service Layer**: `FacilityService` handles all GraphQL operations with RxJS observables
- **Data Transformation**: Complex `forkJoin` operations for parallel facility detail fetching
- **State Management**: RxJS reactive patterns with `mergeMap`, `take(1)`, and `forkJoin`

### React Implementation  
- **Custom Hooks**: Data fetching logic in `useFacilities.ts` using `useQuery` and `useEffect`
- **Async Patterns**: Direct `fetch` calls for detail queries instead of Apollo for flexibility
- **State Management**: Local state with `useState` and `useEffect` for complex data flows

## Type System

Shared type definitions with slight naming differences:
- Angular: Interface names prefixed with `I` (e.g., `IfacilityResponse`)
- React: Clean interface names (e.g., `FacilityResponse`)

Key types: `FacilityListItem`, `FacilityList`, `LocalizedObject`, `Capacity`

## Development Commands

```bash
# Angular (main app)
npm start                 # Serve at localhost:4200
npm run build            # Production build
npm test                 # Run Karma tests

# React (experimental)
cd react-app
npm run dev             # Serve at localhost:5173
npm run build           # Production build
```

## Environment Configuration

Both apps use identical environment setup:
- API URL: `https://parking.fintraffic.fi/proxy/graphql/`
- Development/production flags in respective `environment.ts` files

## Context7 Integration

Per `CLAUDE.md`: Always use Context7 MCP tools for library documentation and setup without explicit request.

## Key Files for Reference

- GraphQL queries: `src/graphql/queries.ts` + `react-app/src/graphql/queries.ts`
- Angular service: `src/app/services/facility-service.ts`
- React hooks: `react-app/src/hooks/useFacilities.ts`
- Type definitions: `src/types/index.ts` + `react-app/src/types/index.ts`
- Apollo setup: `react-app/src/lib/apollo-client.ts`