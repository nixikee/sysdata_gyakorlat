import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { getAddUserForm } from 'src/app/shared/form/add-user.form';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  currentUser: any;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  emailError = false;
  email1Error = false;
  email2Error = false;
  companyIdError = false;
  passwordError = false;
  firstNameError = false;
  lastNameError = false;
  roleError = false;

  constructor(private router: Router, private modalService: NgbModal, private storageService: StorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    if (this.currentUser.role == "ROLE_ADMIN") {
      this.initForm();
    }  else if (this.currentUser.role != null) {
      this.storageService.home();
    } else {
      this.storageService.login();
    }
  }

  initForm(): void {
    this.form = getAddUserForm();
  }

  saveUser(content: any){
    this.isSuccessful = false;
    this.isSignUpFailed = false;
    this.errorMessage = '';
    this.emailError = false;
    this.email1Error = false;
    this.email2Error = false;
    this.companyIdError = false;
    this.passwordError = false;
    this.firstNameError = false;
    this.lastNameError = false;
    this.roleError = false;

    if (this.form.valid) {

      console.log(this.form.value);

      if (this.form.value.email == this.form.value.email2 && this.form.value.email.length > 0 && this.form.value.email2.length > 0 && 
        this.form.value.companyId.length == 8 && this.form.value.password.length >= 6 && this.form.value.firstName.length > 0 && this.form.value.lastName.length > 0 &&
        this.form.value.role.length > 0) {

        this.modalService.open(content, {}).result.then((result) => {
          if(result == "Add click") {
            this.authService.register(this.form.value).subscribe({
              next: data => {
                this.isSuccessful = true;
                this.isSignUpFailed = false;
                this.router.navigate(['/list_user']);
              },
              error: err => {
                this.errorMessage = err.error.message;
                this.isSignUpFailed = true;
              }
            });
    
          }
        }, err => {
          console.warn(err);
        });


      } else if (this.form.value.email != this.form.value.email2) {
        this.emailError = true;
      } else if (this.form.value.email.length == 0) {
        this.email1Error = true;
      } else if (this.form.value.email2.length == 0) {
        this.email2Error = true;
      } else if (this.form.value.companyId.length != 8) {
        this.companyIdError = true;
      } else if (this.form.value.password.length < 6) {
        this.passwordError = true;
      } else if (this.form.value.firstName.length < 0) {
        this.firstNameError = true;
      } else if (this.form.value.lastName.length < 0) {
        this.lastNameError = true;
      } else if (this.form.value.role.length < 0) {
        this.roleError = true;
      }
    }
  }

}
