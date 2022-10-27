import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'invoiceManagerView';

  private role: any;
  isLoggedIn = false;
  showAdmin = false;
  showManager = false;
  showFinancialController = false;
  showFinancialClerk = false;
  username?: string;

  constructor(private storageService: StorageService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.role = user.role;

      this.showAdmin = this.role.includes('ROLE_ADMIN');
      this.showManager = this.role.includes('ROLE_MANAGER');
      this.showFinancialController = this.role.includes('ROLE_FINANCIAL_CONTROLLER');
      this.showFinancialClerk = this.role.includes('ROLE_FINANCIAL_CLERK');

      this.username = user.lastName + ' ' + user.firstName;
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        this.storageService.clean();
        this.router.navigate(['home']);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  
}
