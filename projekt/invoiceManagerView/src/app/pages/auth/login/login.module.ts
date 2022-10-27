import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
