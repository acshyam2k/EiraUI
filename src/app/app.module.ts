import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { FileValueAccessor } from './file-value-accessor';
import { FormlyFieldFile } from './file-type.component';


import { FlexLayoutType } from './flex-layout.type';

import { MatDialogModule } from "@angular/material/dialog";
import { MatToolbarModule } from  '@angular/material/toolbar';
import { MatIconModule } from  '@angular/material/icon';
import { MatButtonModule } from  '@angular/material/button';
import { MatTableModule } from  '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatDividerModule } from  '@angular/material/divider';
import { MatProgressSpinnerModule } from  '@angular/material/progress-spinner';
import { MatInputModule } from  '@angular/material/input';
import { MatCardModule } from  '@angular/material/card';
import { MatSlideToggleModule } from  '@angular/material/slide-toggle';
import { MatSelectModule } from  '@angular/material/select';
import { MatRadioModule } from  '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpInterceptorBasicAuthService } from './service/http/http-interceptor-basic-auth.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { LayoutModule } from '@angular/cdk/layout';
import { PlantTypeComponent } from './plant-type/plant-type.component';
import { SiteComponent } from './site/site.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerTableComponent } from './customer/table/customer-table/customer-table.component';
import { SiteTableComponent } from './site/table/site-table/site-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { RegionDialogComponent } from './shared/dialog/region-dialog/region-dialog.component';
import { CompanyComponent } from './company/company.component';
import { CompanyTableComponent } from './company/table/company-table/company-table.component';
import { FileDragDropDirective } from './directives/file-drag-drop/file-drag-drop.directive';
import { EquipmentComponent } from './equipment/equipment.component';
import { EquipmentTableComponent } from './equipment/table/equipment-table/equipment-table.component';
import { SitetypeDialogComponent } from './shared/dialog/sitetype-dialog/sitetype-dialog.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SideNavMenuComponent } from './side-nav-menu/side-nav-menu.component';
import { DataloggerComponent } from './datalogger/datalogger.component';
import { DataLoggerTableComponent } from './datalogger/table/dataLogger-table/dataLogger-table.component';
import { EquipmenttypeComponent } from './equipmenttype/equipmenttype.component';
import { EquipmenttypeTableComponent } from './equipmenttype/table/equipmenttype-table/equipmenttype-table.component'

import { EquipmentCategoryComponent } from './equipment-category/equipment-category.component';
import { EquipmentCategoryTableComponent } from './equipment-category/equipment-category-table/equipment-category-table.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { SignupComponent } from './signup/signup.component';
import { FormlyModule } from '@ngx-formly/core';
import { StandardisedErrorCodeComponent } from './standardised-error-code/standardised-error-code.component';
import { StandardisedErrorCodeTableComponent } from './standardised-error-code/standardised-error-code-table/standardised-error-code-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ErrorComponent,
    LoginComponent,
    LogoutComponent,
    DashboardComponent,
    PlantTypeComponent,
    SiteComponent,
    CustomerComponent,
    CustomerTableComponent,
    SiteTableComponent,
    RegionDialogComponent,
    CompanyComponent,
    CompanyTableComponent,
    FileDragDropDirective,
    EquipmentComponent,
    SitetypeDialogComponent,
    SidenavComponent,
    EquipmentTableComponent,
    SideNavMenuComponent,
    DataloggerComponent,
    DataLoggerTableComponent,
    EquipmenttypeComponent,
    EquipmenttypeTableComponent,
    EquipmentCategoryComponent,
    EquipmentCategoryTableComponent,
      UserRegistrationComponent,
      SignupComponent,
      FlexLayoutType,
      FileValueAccessor,
      FormlyFieldFile,
      StandardisedErrorCodeComponent,
    StandardisedErrorCodeTableComponent

   ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    FormlyModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatSelectModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    LayoutModule,
    MatPaginatorModule,
    MatSortModule,
    FormlyModule.forRoot({
      types: [
        { name: 'flex-layout', component: FlexLayoutType },
        { name: 'file', component: FormlyFieldFile, wrappers: ['form-field'] },

      ],
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
    }),
    FormlyMaterialModule,
    FormlyMatDatepickerModule,

  ],
  providers: [  { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorBasicAuthService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
