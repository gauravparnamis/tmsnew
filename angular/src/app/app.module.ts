import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AppRoutingModule } from './/app-routing.module';
import { MainDeskComponent } from './main-desk/main-desk.component';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import {MyserviceService} from './myservice.service';
import { HttpClientModule } from '@angular/common/http';
import { ForgetmailComponent } from './forgetmail/forgetmail.component';
import { ResetComponent } from './reset/reset.component';
import { AdminComponent, DialogOverview } from './admin/admin.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import {MatDialogModule} from '@angular/material'
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import { MenuOverviewExample } from './admin/admin.component';
import {StepperOverviewExample} from './admin/form/form.component';
import {
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatExpansionModule,
  MatGridListModule,
  MatListModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSortModule,
  MatTableModule,
  
  
  MatTabsModule,
  MatToolbarModule,
  MatStepperModule,
} from '@angular/material';
import { FormComponent,   } from './admin/form/form.component';
import { TaskcreationComponent } from './admin/taskcreation/taskcreation.component';
import { DialogOverviewComponent } from './dialog-overview/dialog-overview.component';
// import {SelectCustomTriggerExample} from '../app/admin/taskcreation/taskcreation.component';
 import { FileSelectDirective } from 'ng2-file-upload';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { AnimatetxtComponent } from './animatetxt/animatetxt.component';
import { TaskcomponentComponent } from '../app/admin/taskcomponent/taskcomponent.component';
import { AdminlistComponent } from './adminlist/adminlist.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserDashboardComponent,
    MainDeskComponent,
    ForgetmailComponent,
    ResetComponent,
    AdminComponent,
    DialogOverview,
    MenuOverviewExample,
    FormComponent,
    StepperOverviewExample,
    TaskcreationComponent,
    DialogOverviewComponent,
    // SelectCustomTriggerExample,
    FileSelectDirective,
    PageNotFoundComponent,
    AnimatetxtComponent,
    TaskcomponentComponent,
    AdminlistComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatIconModule,
    SlimLoadingBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
     MatSliderModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatStepperModule,
    Ng4LoadingSpinnerModule.forRoot() 

    
    
    
    
  ],
  entryComponents: [DialogOverview, DialogOverviewComponent],
  exports:[DialogOverview],

  providers: [ MyserviceService, DialogOverview,AuthGuard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
