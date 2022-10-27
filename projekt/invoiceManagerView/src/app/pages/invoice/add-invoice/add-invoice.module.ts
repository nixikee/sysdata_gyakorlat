import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddInvoiceComponent } from './add-invoice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';



@NgModule({
  declarations: [AddInvoiceComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatChipsModule
  ],
  exports: [AddInvoiceComponent]
})
export class AddInvoiceModule { }
