import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddInvoiceComponent } from './pages/invoice/add-invoice/add-invoice.component';
import { ListInvoiceComponent } from './pages/invoice/list-invoice/list-invoice.component';
import { PdfComponent } from './pages/invoice/pdf/pdf.component';
import { UpdateInvoiceComponent } from './pages/invoice/update-invoice/update-invoice.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ListUserComponent } from './pages/user/list-user/list-user.component';
import { UpdatePasswordComponent } from './pages/user/update-password/update-password.component';
import { UpdateUserComponent } from './pages/user/update-user/update-user.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ProfileComponent } from './pages/auth/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'list_invoice', component: ListInvoiceComponent },
  { path: 'add_invoice', component: AddInvoiceComponent },
  { path: 'pdf_invoice/:id', component: PdfComponent },
  { path: 'update-invoice/:id', component: UpdateInvoiceComponent },
  { path: 'list_user', component: ListUserComponent },
  { path: 'update-user/:id', component: UpdateUserComponent },
  { path: 'update-password/:id', component: UpdatePasswordComponent },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
