import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Observable, catchError, map, throwError } from "rxjs";
import { GET_FACILITIES } from "src/graphql/queries";
import { IfacilitiesInput, IfacilitiesResponse } from "src/types";

@Injectable({
  providedIn: "root",
})

export class FacilityService {
  constructor (private gql: Apollo) {}

  watchFacilities(variables: IfacilitiesInput): Observable<Array<IfacilitiesResponse>> {
    return this.gql
      .query<{ facilities: Array<IfacilitiesResponse> }> ({
        query: GET_FACILITIES,
        variables
      })
      .pipe(map((res) => res.data.facilities),
      catchError((error) => {
        console.error('GraphQL query error:', error);
        return throwError(error);
      })
      );
  }
}