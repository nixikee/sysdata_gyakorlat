import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pathInvoice1 = "assets/images/invoice1.png";
  pathInvoice2 = "assets/images/invoice2.png";
  pathYettel = "assets/images/yettel.jpg";

  currentUser: any;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    if (this.currentUser.role == null) {
      this.storageService.login();
    }
  }

}
