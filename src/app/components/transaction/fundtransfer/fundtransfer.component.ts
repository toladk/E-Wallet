import { TransactionService } from './../service/transaction.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fundtransfer',
  templateUrl: './fundtransfer.component.html',
  styleUrls: ['./fundtransfer.component.css']
})
export class FundtransferComponent implements OnInit {

  fundTransferForm: FormGroup;

  allWalletBeneficiaryList = [];
  allBankBeneficiaryList = [];

  isLoadingBtn = false;
  isLoadingBtn2 = false;
  walletTransfer = false;
  selectTo = true;
  accountTransfer = false;
  successMessage = false;
  errorMessage = false;
  isVisible = false;
  isConfirmLoading = false;

  walletBeneficiaryDetails: any;
  bankBeneficiaryDetails: any;
  reference: any;
  uniqueKey = 'A06233E0-A72F-11EA-A0D3-5D6FFEC7EB33';
  walletAccountNo: any;
  walletAccountNo2: any;
  walletName: any;
  walletId: any;
  authUserDetails: any;
  authUserWalletDetails: any;
  userWalletNo: any;
  userWalletMerchantId: any;
  walletTransferDetails: any;
  successReference: any;
  errorToDisplay: any;
  transactionPasswordDetails: any;


  constructor(
    private formBuilder: FormBuilder,
    private transactionService: TransactionService,
    private notification: NzNotificationService,
    private router : Router,
  ) { }

  ngOnInit(): void {
    this.fundTransferForm = this.formBuilder.group({
      walletBeneficiary: ['', Validators.required],
      bankBeneficiary: ['', Validators.required],
      amount: ['', Validators.required],
      walletAccountNumber: ['', Validators.required],
      creditWalletNumber: ['', Validators.required],
      merchantId: ['', Validators.required],
      transactionReference: ['', Validators.required],
      uniqueKey: ['', Validators.required],
      narration: ['', Validators.required],
      appId: ['', Validators.required],
      transactionPassword: ['', Validators.required],
    });

    this.getBankBeneficiary();
    this.getWalletBeneficiary();
    this.getAuthenticatedUser();
    this.getAuthenticatedUserWallet();
  }

  get f(){
    return this.fundTransferForm.controls;
  }

  handleCancel(){
    this.isVisible = false;
  }

  clearForm(){
    this.fundTransferForm.reset();
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
      this.userWalletMerchantId = this.authUserWalletDetails.merchant_id;
    });
  }

  // get wallet beneficiary
  getWalletBeneficiary(){
    this.transactionService.getWalletBeneficiary().subscribe((result: any) => {
      this.allWalletBeneficiaryList = result.beneficiaryDetails;
    });
  }

  // get bank beneficiary
  getBankBeneficiary(){
    this.transactionService.getBankBeneficiary().subscribe((result: any) => {
      this.allBankBeneficiaryList = result.beneficiaryDetails;
    });
  }

  // get beneficiary by ID
  getWalletBeneficiaryById(): void{
    if (this.fundTransferForm.value.walletBeneficiary === 'addBeneWallet') {
      this.router.navigateByUrl('app/beneficiary');
    } else {
      this.transactionService.getBeneficiaryById(this.fundTransferForm.value.walletBeneficiary).subscribe((result: any) => {
        this.walletBeneficiaryDetails = result.beneficiaryDetails;

        this.walletAccountNo = this.walletBeneficiaryDetails.beneficiary_account_number;
        this.walletName = this.walletBeneficiaryDetails.beneficiary_name;
        this.walletId = this.walletBeneficiaryDetails.wallet_id;

        this.walletTransfer = true;
        this.selectTo = false;
      });
    }
  }

  getBankBeneficiaryById(): void{
    if (this.fundTransferForm.value.bankBeneficiary === 'addBeneAccount') {
      this.router.navigateByUrl('app/beneficiary');
    } else {
      this.transactionService.getBeneficiaryById(this.fundTransferForm.value.bankBeneficiary).subscribe((result: any) => {
        this.walletBeneficiaryDetails = result.beneficiaryDetails;

        this.walletAccountNo = this.walletBeneficiaryDetails.beneficiary_account_number;
        this.walletName = this.walletBeneficiaryDetails.beneficiary_name;
        this.walletId = this.walletBeneficiaryDetails.wallet_id;

        this.accountTransfer = true;
        this.selectTo = false;
      });
    }
  }

  // get timestamp and generate reference
  generateReference(): void{
    const stamp = Math.floor(Date.now() / 1000);
    const transacReference = this.userWalletMerchantId;
    this.reference = stamp + transacReference;
  }

  // Verify Transaction Password
  validateTransactionPassword(): void{
    this.isConfirmLoading = true;
    this.transactionService.verifyTransactionPassword(this.fundTransferForm.value).subscribe((result: any) => {
      this.transactionPasswordDetails = result;
      if (result.passwordIsValid === true) {
        delete this.fundTransferForm.value.walletBeneficiary;
        delete this.fundTransferForm.value.bankBeneficiary;
        this.fundTransferForm.value.uniqueKey = this.uniqueKey;
        this.fundTransferForm.value.merchantId = this.userWalletMerchantId;
        this.fundTransferForm.value.transactionReference = this.reference;
        // tslint:disable-next-line:no-shadowed-variable
        this.transactionService.walletTransfer(this.fundTransferForm.value).subscribe((result: any) => {
          this.walletTransferDetails = result;
          this.notification.success( 'Wallet Transfer', 'Account Funded Successfully !!');
          this.clearForm();
          this.isLoadingBtn = false;
          this.walletTransfer = false;
          this.selectTo = false;
          this.successMessage = true;
          this.successReference = result.transactionReference;
          this.isVisible = false;
          this.isConfirmLoading = false;
        }, error => {
          this.isLoadingBtn = true;
          this.clearForm();
          this.walletTransfer = false;
          this.selectTo = false;
          this.errorMessage = true;
          // this.notification.error( 'Wallet Transfer', error.error.message || error.error.responseMessage );
          this.errorToDisplay = error.error.message || error.error.responseMessage;
        });
      }
    }, error => {
      this.isConfirmLoading = false;
      this.notification.error( 'Validate Password', error.error.message || error.error.responseMessage );
    });
  }

  // Submit wallet Transfer
  submitWalletTransfer(){
    this.transactionService.getAuthenticatedUserWallet().subscribe((result: any) => {
      this.authUserWalletDetails = result;
      if (result.transaction_password ===  null){
        this.router.navigateByUrl('app/set-tranx-password');
      } else {
        this.isVisible = true;
      }
    });

  }

}
