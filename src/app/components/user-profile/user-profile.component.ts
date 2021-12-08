import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { TransactionService } from '../transaction/service/transaction.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  authUserDetails: any;
  authUserWalletDetails: any;
  userWalletNo: any;
  userCustomerId: any;
  userWalletMerchantId: any;

  constructor(
    private transactionService: TransactionService,
    private notification: NzNotificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.getAuthenticatedUser();
    this.getAuthenticatedUserWallet();
  }

  //  Authenticated loggedin user
  getAuthenticatedUser(): void{
    this.transactionService.getAuthenticatedUser().subscribe((result: any) => {
      this.authUserDetails = result;
    });
  }
  getAuthenticatedUserWallet(): void{
    this.transactionService.getAuthenticatedUserWallet().subscribe((result: any) => {
      this.authUserWalletDetails = result;
    });
  }

}
