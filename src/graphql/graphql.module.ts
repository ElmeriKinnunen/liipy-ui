import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { InMemoryCache, ApolloLink } from '@apollo/client/core';
import { apiUrl } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClientModule } from "@angular/common/http"
import { HttpLink } from "apollo-angular/http"

const uri = new URL("grapql", apiUrl).toString();

export function createApollo(httpLink: HttpLink, router: Router) {
    const link = ApolloLink.from([
      httpLink.create({ uri }),
    ])

    const defaultOptions = {
      watchQuery: {
        fetchPolicy: "cache-and-network",
        errorPolicy: "ignore",
      },
      query: {
        fetchPolicy: "network-only",
        errorPolicy: "all",
      },
    };

     const cache = new InMemoryCache();

    return {
      link,
      defaultOptions,
      cache
    }
}

@NgModule({
  exports: [HttpClientModule],
  imports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, Router]
    },
  ],
})

export class GraphQLModule {}
