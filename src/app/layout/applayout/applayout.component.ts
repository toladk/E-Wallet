import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../authentication/service/authentication.service';
import { TokenService } from './../../authentication/service/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applayout',
  templateUrl: './applayout.component.html',
  styleUrls: ['./applayout.component.css']
})
export class ApplayoutComponent implements OnInit {

  authUserDetails: any;
  authUserWalletDetails: any;

  constructor(
    private tokenService: TokenService,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.getAuthenticatedUser();
    this.getAuthenticatedUserWallet();
  }

  getAuthenticatedUser(): void{
    this.authenticationService.getAuthenticatedUser().subscribe((result: any) => {
      this.authUserDetails = result;
    });
  }

  getAuthenticatedUserWallet(): void{
    this.authenticationService.getAuthenticatedUserWallet().subscribe((result: any) => {
      this.authUserWalletDetails = result;
    });
  }

  fundWallet(): void{
    this.router.navigateByUrl('app/fund-wallet');
  }

  LogOut(): void{
    this.tokenService.logout();
    this.authenticationService.changeAuthStatus(false);
  }

}
