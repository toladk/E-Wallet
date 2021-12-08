import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../service/transaction.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fundwithdrawal',
  templateUrl: './fundwithdrawal.component.html',
  styleUrls: ['./fundwithdrawal.component.css']
})
export class FundwithdrawalComponent implements OnInit {

  fundWithdrawalForm: FormGroup;

  WalletArray = [
    { value: "", name: "Select Wallet"},
    { value: "3320004434", name: "3320004434"}
  ];

  successMessage = false;
  errorMessage = false;
  isVisible = false;
  isLoadingBtn = false;
  isConfirmLoading = false;

  authUserDetails: any;
  authUserWalletDetails: any;
  userWalletNo: any;
  userCustomerId: any;
  userWalletMerchantId: any;
  reference: any;
  transactionPasswordDetails: any;
  fundWithdrawalDetails: any;
  errorToDisplay: any;
  allBankList = [];

  constructor(
    private formBuilder: FormBuilder,
    private transactionService: TransactionService,
    private notification: NzNotificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fundWithdrawalForm = this.formBuilder.group({
      walletAccountNumber: ['', Validators.required],
      amount: ['', Validators.required],
      fee: ['', Validators.required],
      destinationAccountNumber: ['', Validators.required],
      destinationAccountName: ['', Validators.required],
      narration: ['', Validators.required],
      uniqueKey: ['', Validators.required],
      transactionPassword: ['', Validators.required],
      transactionReference: ['', Validators.required],
      appId: ['', Validators.required],
      destinationBankCode: ['', Validators.required],
      merchantId: ['', Validators.required],
    });

    this.getAuthenticatedUserWallet();
    this.getAuthenticatedUser();
    this.getAllBank();
  }

  handleCancel(){
    this.isVisible = false;
  }

  clearForm(){
    this.fundWithdrawalForm.reset();
  }

  //get Authenticated loggedin user
  getAuthenticatedUser(){
    this.transactionService.getAuthenticatedUser().subscribe((result: any) => {
      this.authUserDetails = result;
    });
  }
  getAuthenticatedUserWallet(){
    this.transactionService.getAuthenticatedUserWallet().subscribe((result: any) => {
      this.authUserWalletDetails = result;

      this.userWalletNo = this.authUserWalletDetails.wallet_number;
      this.userCustomerId = this.authUserWalletDetails.customer_id;
      this.userWalletMerchantId = this.authUserWalletDetails.merchant_id;
      this.generateReference();

    });
  }

  // get timestamp and generate reference
  generateReference(){
    const stamp = Math.floor(Date.now() / 1000);
    const transacReference = this.userWalletMerchantId;
    this.reference = stamp + transacReference;
  }

  // get Banks
  getAllBank(){
    this.transactionService.getBanks().subscribe((result: any) => {
      this.allBankList = result.bankList;
    });
  }

  // Withdrawal to account
  fundWithdrawalCheck(){
    this.transactionService.getAuthenticatedUserWallet().subscribe((result: any) => {
      this.authUserWalletDetails = result;
      if (result.transaction_password ===  null){
        this.router.navigateByUrl('app/set-tranx-password');
      } else {
        this.isVisible = true;
      }
    });
  }
  fundwithdrawalSubmit(): void{
    this.isConfirmLoading = true;
    this.fundWithdrawalForm.value.transactionReference = this.reference;
    this.transactionService.verifyTransactionPassword(this.fundWithdrawalForm.value).subscribe((result: any) => {
      this.transactionPasswordDetails = result;
      if (result.passwordIsValid === true) {
        this.fundWithdrawalForm.value.fee = 100;
        this.fundWithdrawalForm.value.merchantId = this.userWalletMerchantId;
        this.fundWithdrawalForm.value.uniqueKey = 'A06233E0-A72F-11EA-A0D3-5D6FFEC7EB33';
        this.fundWithdrawalForm.value.appId = 'ewallet';
        this.transactionService.fundWithdrawal(this.fundWithdrawalForm.value).subscribe((result: any) => {
          this.fundWithdrawalDetails = result;
          this.isLoadingBtn = false;
          this.successMessage = true;
          this.errorMessage = false;
          this.isVisible = false;
          this.isConfirmLoading = false;
        }, error => {
          this.successMessage = false;
          this.errorMessage = true;
          this.isLoadingBtn = false;
          this.isConfirmLoading = false;
          this.notification.error( 'Fund Withdrawal', error.error.message || error.error.responseMessage );
          this.errorToDisplay = error.error.message || error.error.responseMessage;
        });
      }
    }, error => {
      this.isConfirmLoading = false;
      this.isVisible = false;
      this.notification.error( 'Validate Password', error.error.message || error.error.responseMessage );
    });
  }

}
