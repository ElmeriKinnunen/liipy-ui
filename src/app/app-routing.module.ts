import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { UserFacilitiesComponent } from './user-facilities/user-facilities.component';
import { AreaFacilitiesComponent } from './area-facilities/area-facilities.component';
import { AreaIdGuard } from './guards/area-id.guard';

const routes: Routes = [
  { path: '', component: FacilitiesComponent },
  { path: 'privacy', component: PrivacyPolicyComponent },
  { path: 'beta', component: UserFacilitiesComponent },
  { path: 'area/:id', component: AreaFacilitiesComponent, canActivate: [AreaIdGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
