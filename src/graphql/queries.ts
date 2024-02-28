import { gql } from "apollo-angular";

export const GET_FACILITIES = gql`
  query facilities($statuses: [String], $ids: [ID]) {
    facilities(statuses: $statuses, ids: $ids) {
      cursor, 
      totalCount, 
      hasMore, 
      facilities{
        id
        name {
          fi
        }
        status
        type
        builtCapacity {
          CAR, 
          ELECTRIC_CAR,
        }
      }
    }
  }
`

export const GET_FACILITY = gql`
  query facilityUtilization($id: ID!) {
    facilityUtilization(id : $id) {
      facilityId,
      capacityType,
      usage:,
      timestamp,
      spacesAvailable,
      capacity,
      openNow,
    }
  }
`