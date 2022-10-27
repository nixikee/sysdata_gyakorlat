import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './pages/home/home.module';
import { PdfService } from './services/pdf.service';
import { PdfModule } from './pages/invoice/pdf/pdf.module';
import { InvoiceService } from './services/invoice.service';
import { ListInvoiceModule } from './pages/invoice/list-invoice/list-invoice.module';
import { AddInvoiceModule } from './pages/invoice/add-invoice/add-invoice.module';
import { UpdateInvoiceModule } from './pages/invoice/update-invoice/update-invoice.module';
import { UserService } from './services/user.service';
import { ListUserModule } from './pages/user/list-user/list-user.module';
import { UpdateUserModule } from './pages/user/update-user/update-user.module';
import { UpdatePasswordModule } from './pages/user/update-password/update-password.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { LoginModule } from './pages/auth/login/login.module';
import { ProfileModule } from './pages/auth/profile/profile.module';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './httpInterceptor/auth.interceptor';
import { RegisterModule } from './pages/auth/register/register.module';
import { StorageService } from './services/storage.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    HomeModule,
    PdfModule,
    ListInvoiceModule,
    AddInvoiceModule,
    UpdateInvoiceModule,
    ListUserModule,
    UpdateUserModule,
    UpdatePasswordModule,
    LoginModule,
    ProfileModule,
    RegisterModule
  ],
  providers: [InvoiceService, UserService, PdfService, StorageService, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
