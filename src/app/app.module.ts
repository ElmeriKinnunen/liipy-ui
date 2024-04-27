import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from 'src/graphql/graphql.module';
import { FacilityService } from './services/facility-service';
import { CookieBannerComponent } from './cookie-banner/cookie-banner.component';
import { CookieService } from 'ngx-cookie-service';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { UserFacilitiesComponent } from './user-facilities/user-facilities.component';
import { FooterComponent } from './footer/footer.component';
import { AreaFacilitiesComponent } from './area-facilities/area-facilities.component';
import { FacilitiesListComponent } from './area-facilities/components/facilities-list/facilities-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CookieBannerComponent,
    PrivacyPolicyComponent,
    FacilitiesComponent,
    UserFacilitiesComponent,
    FooterComponent,
    AreaFacilitiesComponent,
    FacilitiesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule
  ],
  providers: [FacilityService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
