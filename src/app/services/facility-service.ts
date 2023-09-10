import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import * as dayjs from "dayjs";
import { Observable, forkJoin, map, mergeMap, take } from "rxjs";
import { GET_FACILITIES, GET_FACILITY } from "src/graphql/queries";
import { IfacilitiesInput, IfacilitiesResponse, IfacilityInput, IfacilityList, IfacilityListItem, IfacilityResponse } from "src/types";

@Injectable({
  providedIn: "root",
})

export class FacilityService {
  constructor(private gql: Apollo) {}

  // get all facilities
  watchFacilities(variables: IfacilitiesInput): Observable<IfacilitiesResponse> {
    return this.gql
      .query<{ facilities: IfacilitiesResponse }>({
        query: GET_FACILITIES,
        variables,
      })
      .pipe(
        map((res) => res.data.facilities),
      );
  }

  // get single facility with details
  watchFacility(variables: IfacilityInput): Observable<IfacilityResponse> {
    return this.gql
      .query<{ facilityPrediction: IfacilityResponse }>({
        query: GET_FACILITY,
        variables,
      })
      .pipe(
        map((res) => res.data.facilityPrediction),
      );
  }

  // get listItem
  fetchFacilityList(args: IfacilitiesInput): Observable<IfacilityListItem[]> {
    return this.watchFacilities(args).pipe(
      mergeMap((facilities) => {
        const facilityObservables = facilities.facilities.map((facility) =>
          this.watchFacility({ id: facility.id, after: 0 }).pipe(
            take(1),
            map((facilityData) => {
              if (Array.isArray(facilityData) && facilityData.length > 0) {
                facilityData = facilityData[0];
              }
              return {
                id: facility.id,
                name: facility.name.fi,
                builtCapacityCar: facility.builtCapacity?.CAR,
                builtCapacityElectricCar: facility.builtCapacity?.ELECTRIC_CAR || 0,
                spacesAvailable: facilityData.spacesAvailable,
                timestamp: dayjs(new Date(facilityData.timestamp)).format('DD-MM-YYYY HH:mm'),
              };
            })
          )
        );
  
        return forkJoin(facilityObservables);
      })
    );
  }

  // get multiple lists of listItems
  fetchAllFacilityDetails(): Observable<IfacilityList[]> {
    const lists: Array<IfacilitiesInput> = [
      {
        statuses: ["IN_OPERATION"],
        ids: [992, 990, 755, 619],
        listName: "Läsniväylä",
      },
      {
        statuses: ["IN_OPERATION"],
        ids: [444, 1006, 303, 1233],//placeholder IDs
        listName: "Lähijuna länteent",
      },
      {
        statuses: ["IN_OPERATION"],
        ids: [1091, 751, 619, 1047], //placeholder IDs
        listName: "Lähijuna itään",
      },
    ];
  
    const observables = lists.map((list) =>
      this.fetchFacilityList(list).pipe(
        map((result) => ({ listName: list.listName as string, items: result }))
      )
    );

    return forkJoin(observables).pipe(
      map((results) => results)
    );
  }
}
