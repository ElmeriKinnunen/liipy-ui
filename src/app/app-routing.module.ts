import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { UserFacilitiesComponent } from './user-facilities/user-facilities.component';
import { FacilityComponent } from './facility/facility.component';

const routes: Routes = [
  { path: '', component: FacilitiesComponent },
  { path: 'privacy', component: PrivacyPolicyComponent },
  { path: 'beta', component: UserFacilitiesComponent },
  { path: 'facility/:id', component: FacilityComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
