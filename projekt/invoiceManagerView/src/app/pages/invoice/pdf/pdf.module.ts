import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfComponent } from './pdf.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    PdfComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    NgbModalModule
  ],
  exports: [PdfComponent]
})
export class PdfModule { }
