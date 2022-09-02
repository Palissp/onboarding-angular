import { Component, OnInit } from '@angular/core';
import {UserInfo} from "./models/library";

@Component({
  selector: 'app-library',
  templateUrl: './main-library.component.html',
  styleUrls: ['./main-library.component.scss']
})
export class MainLibraryComponent implements OnInit {
  public userInfo!: UserInfo;
  constructor() { }

  ngOnInit(): void {
  this.getUserInfo();
  }

  private getUserInfo(): void{
    this.userInfo = JSON.parse(sessionStorage.getItem('user')!)
  }
}
