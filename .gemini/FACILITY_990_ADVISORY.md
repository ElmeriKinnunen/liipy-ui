# Facility 990 Warning (Temporary Fix)

## Situation
The data source for facility **990** (parking availability) is currently unreliable. The number of available spaces reported by the API may be incorrect.

## Changes Made
A manual check for facility ID `990` has been added to the following components:
1. `react-app/src/components/FacilitiesList.tsx`
2. `react-app/src/components/FavoritesFacilities.tsx`

### Specific Logic
- **Warning Message:** Displayed after the facility name: *"Vapaiden paikkojen määrä saattaa näkyä väärin tietolähteestä johtuen"*.
- **Visual Indicator:** The `spacesAvailable` count is forced to `text-red-600` regardless of the actual number.

## How to Revert
When the data source issue is resolved, remove the following conditional logic from the affected files:

1. **Remove the Warning Block:**
```tsx
{String(facility.id).startsWith("990") && (
  <div className="flex items-center gap-1.5 text-amber-600 ...">
    ...
  </div>
)}
```

2. **Restore Standard Color Logic:**
Change the `spacesAvailable` color logic from:
```tsx
String(facility.id).startsWith("990")
  ? "text-red-600"
  : (facility.spacesAvailable ?? 0) > 10
  ? "text-green-600"
  ...
```
Back to:
```tsx
(facility.spacesAvailable ?? 0) > 10
  ? "text-green-600"
  : (facility.spacesAvailable ?? 0) > 5
  ? "text-yellow-600"
  : "text-red-600"
```
