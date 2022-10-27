import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListInvoiceComponent } from './list-invoice.component';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbCollapseModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [ListInvoiceComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    NgbCollapseModule,
    Ng2SearchPipeModule,
    NgbModalModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatIconModule
  ],
  exports: [ListInvoiceComponent]
})
export class ListInvoiceModule { }
