import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateUserComponent } from './update-user.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    UpdateUserComponent
  ],
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
  exports: [UpdateUserComponent]
})
export class UpdateUserModule { }
