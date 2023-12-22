import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

//auth fire base
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ClientEditDetailsComponent } from './components/client-edit-details/client-edit-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { ClientService } from './services/client.service';
import { AuthService } from './services/auth.service';
import { UpdateClientComponent } from './components/update-client/update-client.component';
import { MaterialModule } from './material/material.module';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderComponent } from './header/header.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PhotoUploadService } from './services/photo-upload.service';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { BillingFormComponent } from './components/billing-form/billing-form.component';
import { BillingUpdateComponent } from './components/billing-update/billing-update.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BillingDeleteComponent } from './components/billing-delete/billing-delete.component';
import { BillingDeleteDialogComponent } from './components/billing-delete-dialog/billing-delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientListComponent,
    ClientFormComponent,
    ClientDetailsComponent,
    LoginComponent,
    SignUpComponent,
    ClientEditDetailsComponent,
    DashboardComponent,
    UpdateClientComponent,
    DashboardHeaderComponent,
    HeaderComponent,
    UserDetailsComponent,
    UpdateUserComponent,
    BillingFormComponent,
    BillingUpdateComponent,
    BillingDeleteComponent,
    BillingDeleteDialogComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MaterialModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [ClientService, AuthService, PhotoUploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
