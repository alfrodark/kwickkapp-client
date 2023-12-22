import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './components/client-list/client-list.component';
import { LoginComponent } from './components/login/login.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientEditDetailsComponent } from './components/client-edit-details/client-edit-details.component';
import { UpdateClientComponent } from './components/update-client/update-client.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { BillingFormComponent } from './components/billing-form/billing-form.component';
import { BillingUpdateComponent } from './components/billing-update/billing-update.component';
import { BillingDeleteComponent } from './components/billing-delete/billing-delete.component';
import { BillingDeleteDialogComponent } from './components/billing-delete-dialog/billing-delete-dialog.component';



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'client-dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'user-details', component: UserDetailsComponent },
  { path: 'update-user', component: UpdateUserComponent },
  { path: 'dashboard-header', component: DashboardHeaderComponent },
  { path: "add-Client", component: ClientFormComponent },
  { path: "add-bill", component: BillingFormComponent },
  { path: 'clients', component: ClientListComponent },
  { path: 'client-details/:clientId', component: ClientDetailsComponent },
  { path: "client-edit/:clientId", component: ClientEditDetailsComponent },
  { path: "client-update/:clientId", component: UpdateClientComponent },
  { path: 'billing-update/:clientId/:billingId', component: BillingUpdateComponent },
  { path: 'billing-delete/:clientId/:billingId', component: BillingDeleteComponent },
  { path: 'billing-delete-dialog/:clientId/:billingId', component: BillingDeleteDialogComponent },


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
