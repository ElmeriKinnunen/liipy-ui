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
      .query<{ facilityUtilization: IfacilityResponse }>({
        query: GET_FACILITY,
        variables,
      })
      .pipe(
        map((res) => res.data.facilityUtilization),
      );
  }

  // get listItem
  fetchFacilityList(args: IfacilitiesInput): Observable<IfacilityListItem[]> {
    return this.watchFacilities(args).pipe(
      mergeMap((facilities) => {
        const facilityObservables = facilities.facilities.map((facility) =>
          this.watchFacility({ id: facility.id}).pipe(
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
                spacesAvailable: facilityData?.spacesAvailable,
                timestamp: facilityData?.usage ? dayjs(new Date(facilityData.usage)).format('DD.MM.YYYY HH:mm') : "",
              };
            })
          )
        );
        return forkJoin(facilityObservables);
        // return forkJoin(facilityObservables).pipe(
        //   map((items) => items.filter(item => item.spacesAvailable !== undefined))
        // );
      })
    );
  }

  // get multiple lists of listItems
  fetchAllFacilityDetails(): Observable<IfacilityList[]> {
    const lists: Array<IfacilitiesInput> = [
      {
        statuses: ["IN_OPERATION"],
        ids: [1286, 1167, 1233, 992, 1006, 1009, 990, 755, 619],
        listName: "Metro (Länsi)",
        areaId: "001"
      },
      {
        statuses: ["IN_OPERATION"],
        ids: [512, 517, 1091, 1031, 507, 497, 1090],
        listName: "Metro (Itä)",
        areaId: '002'
      },
      {
        statuses: ["IN_OPERATION"],
        ids: [473],
        listName: "Lähijuna (Länsi)",
        areaId: '003'
      },
      {
        statuses: ["IN_OPERATION"],
        ids: [751, 747, 738, 1, 308],
        listName: "Lähijuna (Pohjoinen)",
        areaId: '004'
      },
      {
        statuses: ["IN_OPERATION"],
        ids: [303, 41],
        listName: "Lähijuna (Itä)",
        areaId: '005'
      },
    ];
  
    const observables = lists.map((list) =>
      this.fetchFacilityList(list).pipe(
        map((result) => ({ listName: list.listName as string, areaId: list.areaId, items: result }))
      )
    );

    return forkJoin(observables).pipe(
      map((results) => results)
    );
  }

  fetchUserFacilityDetails(): Observable<IfacilityList[]> {
    const lists: Array<IfacilitiesInput> = [
      {
        statuses: ["IN_OPERATION"],
        ids: [992, 990, 755, 619],
        listName: "Metro (Länsi)",
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

  fetchAreaFacilities(areaId: string): Observable<IfacilityList[]> {
    let ids: number[] = [];
    let listName = "";

    switch(areaId) {
      case '001':
        ids = [1286, 1167, 1233, 992, 1006, 1009, 990, 755, 619];
        listName = "Metro (Länsi)";
        break;
      case '002':
        ids = [512, 517, 1091, 1031, 507, 497, 1090];
        listName = "Metro (Itä)";
        break;
      case '003':
        ids = [473];
        listName = "Lähijuna (Länsi)";
        break;
      case '004':
        ids = [751, 747, 738, 1, 308];
        listName = "Lähijuna (Pohjoinen)";
        break;
      case '005':
        ids = [303, 41];
        listName = "Lähijuna (Itä)";
        break;
      default:
        break;
    }
    
    const lists: Array<IfacilitiesInput> = [
      {
        statuses: ["IN_OPERATION"],
        ids: ids,
        listName: listName,
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
