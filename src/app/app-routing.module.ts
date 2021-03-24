import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { CustomerComponent } from './customer/customer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataloggerComponent } from './datalogger/datalogger.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { EquipmenttypeComponent } from './equipmenttype/equipmenttype.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGuardService } from './service/route-guard.service';
import { SiteComponent } from './site/site.component';
import { EquipmentCategoryComponent } from './equipment-category/equipment-category.component';
import { SignupComponent } from './signup/signup.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { StandardisedErrorCodeComponent } from './standardised-error-code/standardised-error-code.component';



const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'user-registration', component: UserRegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'site', component: SiteComponent},
  {path: 'company', component: CompanyComponent},
  {path: 'customer', component: CustomerComponent},
  {path: 'equipmenttype', component: EquipmenttypeComponent},
  {path: 'equipment', component: EquipmentComponent},
  {path: 'equipment-category',component: EquipmentCategoryComponent},
  {path: 'standardised-error-code', component:StandardisedErrorCodeComponent},
  {path: 'datalogger', component: DataloggerComponent},
  {path: 'logout', component:LogoutComponent, canActivate:[RouteGuardService]},
  {path: '**', component: ErrorComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
   declarations: [

  ]
})
export class AppRoutingModule { }
