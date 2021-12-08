import { Component, OnInit } from '@angular/core';
import { TokenService } from './../authentication/service/token.service';
import { AuthenticationService } from './../authentication/service/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private tokenService: TokenService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
  }

  LogOut(){
    this.tokenService.logout();
    this.authenticationService.changeAuthStatus(false);
  }

}
