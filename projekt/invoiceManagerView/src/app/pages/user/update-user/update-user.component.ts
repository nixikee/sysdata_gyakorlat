import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getAddUserForm } from './../../../shared/form/add-user.form';
import { UserService } from './../../../services/user.service';
import { User } from './../../../shared/models/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  form!: FormGroup;
  currentUser: any;
  id!: number;
  user: User = new User();

  constructor(private router: Router, private modalService: NgbModal, private storageService: StorageService, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    if (this.currentUser.role == "ROLE_ADMIN") {
      this.getUserById();
    } else if (this.currentUser.role != null) {
      this.storageService.home();
    } else {
      this.storageService.login();
    }
  }

  getUserById(): void {
    this.id = this.route.snapshot.params['id'];

    this.userService.getUserById(this.id).subscribe(data => {
      this.user = data;
    }, error => console.log(error));
    this.form = getAddUserForm();
  }

  private home() {
    this.router.navigate(['home']);
  }

  getUser(){
    this.router.navigate(['list_user']);
  }

  updateUser(content: any){

    if(this.form.value.companyId.length == 0) {
        this.form.value.companyId = this.user.companyId;
    }

    if(this.form.value.email.length == 0) {
      this.form.value.email = this.user.email;
    }

    if(this.form.value.firstName.length == 0) {
      this.form.value.firstName = this.user.firstName;
    }

    if(this.form.value.lastName.length == 0) {
      this.form.value.lastName = this.user.lastName;
    }

    if(this.form.value.password.length == 0) {
      this.form.value.password = this.user.password;
    }

    if(this.form.value.role == 0) {
      this.form.value.role = this.user.role;
    }

    this.modalService.open(content, {}).result.then((result) => {
      if(result == "Update click") {
        this.userService.updateUser(this.id, this.form.value).subscribe( data =>{
          this.getUser();
        },
        error => console.log(error));
      }
    }, err => {
      console.warn(err);
    });

  }

}
