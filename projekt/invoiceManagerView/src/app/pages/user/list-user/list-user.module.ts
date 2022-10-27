import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUserComponent } from './list-user.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [ListUserComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    Ng2SearchPipeModule
  ],
  exports: [ListUserComponent]
})
export class ListUserModule { }
