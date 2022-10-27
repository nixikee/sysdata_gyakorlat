import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { LoginModule } from '../auth/login/login.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    LoginModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
