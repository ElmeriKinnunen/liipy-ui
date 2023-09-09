import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import * as dayjs from "dayjs";
import { Observable, catchError, forkJoin, map, take, tap, throwError } from "rxjs";
import { GET_FACILITIES, GET_FACILITY } from "src/graphql/queries";
import { IFacility, IfacilitiesInput, IfacilitiesResponse, IfacilityInput, IfacilityListItem, IfacilityResponse } from "src/types";

@Injectable({
  providedIn: "root",
})

export class FacilityService {
  constructor(private gql: Apollo) {}

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

  fetchAllFacilityDetails(facilities: Array<IFacility>): Observable<IfacilityListItem[]> {
    // TODO: move watchFacilities in here with args

    const observables = facilities.map((facility) =>
      this.watchFacility({id: facility.id, after: 0}).pipe(
        take(1),
        map((facilityData) => {
          if (Array.isArray(facilityData) && facilityData.length > 0) {
            facilityData = facilityData[0];
          }
          return {
            id: facility.id,
            name: facility.name.fi,
            builtCapacityCar: facility.builtCapacity?.CAR,
            builtCapacityElectricCar: facility.builtCapacity?.ELECTRIC_CAR,
            spacesAvailable: facilityData.spacesAvailable,
            timeStamp: dayjs(new Date(facilityData.timestamp)).format('DD-MM-YYYY HH:mm'),
          }
        })
      )
    );
    return forkJoin(observables)
  }
}

