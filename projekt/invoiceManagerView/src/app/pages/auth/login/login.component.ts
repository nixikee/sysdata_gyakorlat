import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { getLoginForm } from '../../../shared/form/login.form';
import { AuthService } from '../../../services/auth.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form!: FormGroup;
  loginError = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role: any;

  constructor(private router: Router, private authService: AuthService, private storageService: StorageService) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.role = this.storageService.getUser().role;
    } else {
      this.initForm();
    }
  }

  initForm(): void {
    this.form = getLoginForm();
  }

  login() {    
      this.authService.login(this.form.value).subscribe({
        next: data => {
          this.storageService.saveUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.role = this.storageService.getUser().role;
          window.location.reload();
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      });
  }
}
