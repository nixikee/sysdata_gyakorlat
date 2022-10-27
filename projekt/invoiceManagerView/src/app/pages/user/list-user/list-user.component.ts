import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { User } from './../../../shared/models/user';
import { sortBy } from 'sort-by-typescript';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  public users!: User[];
  currentUser: any;
  searchText: any;

  orderUserId = "not order";
  orderCompanyId = "not order";
  orderEmail = "not order";
  orderFirstName = "not order";
  orderLastName = "not order";
  orderRole = "not order";

  constructor(private userService: UserService, private router: Router, private storageService: StorageService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    if (this.currentUser.role == "ROLE_ADMIN") {
      this.getUser();
    } else if (this.currentUser.role != null) {
      this.storageService.home();
    } else {
      this.storageService.login();
    }
  }

  private getUser() {
    this.userService.getUser().subscribe(data => {
      this.users = data;
    });
  }

  private home() {
    this.router.navigate(['home']);
  }

  invoiceList(userId: number): void {
    this.router.navigate(['list_user_invoices', userId]);
  }

  updateUser(id: number) {
    this.router.navigate(['update-user', id]);
  }

  updatePassword(id: number) {
    this.router.navigate(['update-password', id]);
  }

  public deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe( data => {
      this.getUser();
    })
  }

  orderByUserId() {
    this.notOrderByUserId();
    if (this.orderUserId == "not ordered" || this.orderUserId == "reverse") {
      this.orderUserId = "ordered";
      this.users.sort(sortBy('-userId'));
    } else {
      this.orderUserId = "reverse";
      this.users.sort(sortBy('userId'));
    }
  }

  orderByCompanyId() {
    this.notOrderByCompanyId();
    if (this.orderCompanyId == "not ordered" || this.orderCompanyId == "reverse") {
      this.orderCompanyId = "ordered";
      this.users.sort(sortBy('-companyId'));
    } else {
      this.orderCompanyId = "reverse";
      this.users.sort(sortBy('companyId'));
    }
  }

  orderByEmail() {
    this.notOrderByEmail();
    if (this.orderEmail == "not ordered" || this.orderEmail == "reverse") {
      this.orderEmail = "ordered";
      this.users.sort(sortBy('-email'));
    } else {
      this.orderEmail = "reverse";
      this.users.sort(sortBy('email'));
    }
  }

  orderByFirstName() {
    this.notOrderByFirstName();
    if (this.orderFirstName == "not ordered" || this.orderFirstName == "reverse") {
      this.orderFirstName = "ordered";
      this.users.sort(sortBy('-firstName'));
    } else {
      this.orderFirstName = "reverse";
      this.users.sort(sortBy('firstName'));
    }
  }

  orderByLastName() {
    this.notOrderByLastName();
    if (this.orderLastName == "not ordered" || this.orderLastName == "reverse") {
      this.orderLastName = "ordered";
      this.users.sort(sortBy('-lastName'));
    } else {
      this.orderLastName = "reverse";
      this.users.sort(sortBy('lastName'));
    }
  }

  orderByRole() {
    this.notOrderByRole();
    if (this.orderRole == "not ordered" || this.orderRole == "reverse") {
      this.orderRole = "ordered";
      this.users.sort(sortBy('-role'));
    } else {
      this.orderRole = "reverse";
      this.users.sort(sortBy('role'));
    }
  }

  notOrderByUserId() {
    this.orderCompanyId = "not order";
    this.orderEmail = "not order";
    this.orderFirstName = "not order";
    this.orderLastName = "not order";
    this.orderRole = "not order";
  }

  notOrderByCompanyId() {
    this.orderUserId = "not order";
    this.orderEmail = "not order";
    this.orderFirstName = "not order";
    this.orderLastName = "not order";
    this.orderRole = "not order";
  }

  notOrderByEmail() {
    this.orderUserId = "not order";
    this.orderCompanyId = "not order";
    this.orderFirstName = "not order";
    this.orderLastName = "not order";
    this.orderRole = "not order";
  }

  notOrderByFirstName() {
    this.orderUserId = "not order";
    this.orderCompanyId = "not order";
    this.orderEmail = "not order";
    this.orderLastName = "not order";
    this.orderRole = "not order";
  }

  notOrderByLastName() {
    this.orderUserId = "not order";
    this.orderCompanyId = "not order";
    this.orderEmail = "not order";
    this.orderFirstName = "not order";
    this.orderRole = "not order";
  }

  notOrderByRole() {
    this.orderUserId = "not order";
    this.orderCompanyId = "not order";
    this.orderEmail = "not order";
    this.orderFirstName = "not order";
    this.orderLastName = "not order";
  }

}
