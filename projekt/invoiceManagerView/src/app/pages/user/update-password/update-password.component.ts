import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { getUpdateUserForm } from './../../../shared/form/update-password.form';
import { UserService } from './../../../services/user.service';
import { User } from './../../../shared/models/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  form!: FormGroup;
  currentUser: any;
  id!: number;
  user: User = new User();

  oldPasswordError = false;
  newPasswordsError = false;

  constructor(private router: Router, private modalService: NgbModal, private storageService: StorageService, 
    private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    if (this.currentUser.role == "ROLE_ADMIN") {
      this.getUserPassword();
    } else if (this.currentUser.role != null) {
      this.getUserOwnPassword(this.currentUser.userId);
    } else {
      this.storageService.login();
    }

  }

  getUserPassword(): void {
    this.id = this.route.snapshot.params['id'];

    this.userService.getUserById(this.id).subscribe(data => {
      this.user = data;
    }, error => console.log(error));
    this.form = getUpdateUserForm();
  }

  getUserOwnPassword(id: number): void {

    this.userService.getUserById(id).subscribe(data => {
      this.user = data;
    }, error => console.log(error));
    this.form = getUpdateUserForm();
  }

  private home() {
    this.router.navigate(['home']);
  }

  getUser(){
    this.router.navigate(['list_user']);
  }

  updatePassword(content: any) {
    this.oldPasswordError = false;
    this.newPasswordsError = false;

    if (this.user.password == this.form.value.oldPassword && this.form.value.newPassword1 == this.form.value.newPassword2) {

      this.modalService.open(content, {}).result.then((result) => {
        if(result == "Update click") {
          this.userService.updatePassword(this.id, this.form.value.newPassword1).subscribe( data =>{
            this.getUser();
          },
          error => console.log(error));
        }
      }, err => {
        console.warn(err);
      });


    } else if (this.user.password != this.form.value.oldPassword) {
      this.oldPasswordError = true;
    } else if (this.form.value.newPassword1 != this.form.value.newPassword2) {
      this.newPasswordsError = true;
    }
  }

}
