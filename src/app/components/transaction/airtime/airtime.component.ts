import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../service/transaction.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-airtime',
  templateUrl: './airtime.component.html',
  styleUrls: ['./airtime.component.css']
})
export class AirtimeComponent implements OnInit {

  selectedTo = 'airtime';

  airtimeForm: FormGroup;
  dataForm: FormGroup;
  typeSelectForm: FormGroup;

  selectAirtimeOrData = true;
  airtimeFormPage = false;
  dataFormPage = false;
  airtimeSelect = true;
  dataSelect = false;
  isVisible = false;
  isConfirmLoading = false;
  isLoadingBtn = false;
  successMessage = false;
  errorMessage = false;

  reference: any;
  authUserDetails: any;
  authUserWalletDetails: any;
  userWalletNo: any;
  userCustomerId: any;
  userWalletMerchantId: any;
  transactionPasswordDetails: any;
  airtimeTopupDetail: any;
  errorToDisplay: any;
  selectedPaymentCode: string;

  constructor(
    private formBuilder: FormBuilder,
    private transactionService: TransactionService,
    private notification: NzNotificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.airtimeForm = this.formBuilder.group({
      amount: ['', Validators.required],
      paymentCode: ['', Validators.required],
      walletAccountNumber: ['', Validators.required],
      merchantId: ['', Validators.required],
      uniqueKey: ['', Validators.required],
      transactionReference: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      transactionPassword: ['', Validators.required],
    });

    this.dataForm = this.formBuilder.group({
      amount: ['', Validators.required],
      paymentCode: ['', Validators.required],
      walletAccountNumber: ['', Validators.required],
      merchantId: ['', Validators.required],
      uniqueKey: ['', Validators.required],
      transactionReference: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      transactionPassword: ['', Validators.required],
    });

    this.typeSelectForm = this.formBuilder.group({
      typeSelect: ['', Validators.required],
    });

    this.getAuthenticatedUser();
    this.getAuthenticatedUserWallet();
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

  handleCancel(){
    this.isVisible = false;
  }

  clearForm(){
    this.airtimeForm.reset();
  }

  selectToBuy(): void{
    if (this.typeSelectForm.value.typeSelect === 'airtime') {
      this.airtimeSelect = true;
      this.dataSelect = false;
    } else if (this.typeSelectForm.value.typeSelect === 'data') {
      this.dataSelect = true;
      this.airtimeSelect = false;
    }

  }

  // get timestamp and generate reference
  generateReference(){
    const stamp = Math.floor(Date.now() / 1000);
    const transacReference = this.userWalletMerchantId;
    this.reference = stamp + transacReference;
  }

  onSelectNetwork(network): void{
    if (network === 'etisalat'){
      this.selectedPaymentCode = '90806';
      this.airtimeFormPage = true;
      this.airtimeSelect = false;
      this.selectAirtimeOrData = false;
    }else if (network === 'mtn'){
      this.selectedPaymentCode = '90304';
      this.airtimeFormPage = true;
      this.airtimeSelect = false;
      this.selectAirtimeOrData = false;
    }
    else if (network === 'airtel'){
      this.selectedPaymentCode = '90106';
      this.airtimeFormPage = true;
      this.airtimeSelect = false;
      this.selectAirtimeOrData = false;
    }else {
      this.selectedPaymentCode = '91309';
      this.airtimeFormPage = true;
      this.airtimeSelect = false;
      this.selectAirtimeOrData = false;
    }
  }
  onSelectNetwork2(network): void{
    if (network === 'etisalat'){
      this.selectedPaymentCode = '90806';
      this.dataFormPage = true;
      this.dataSelect = false;
      this.selectAirtimeOrData = false;
    }else if (network === 'mtn'){
      this.selectedPaymentCode = '90304';
      this.dataFormPage = true;
      this.dataSelect = false;
      this.selectAirtimeOrData = false;
    }
    else if (network === 'airtel'){
      this.selectedPaymentCode = '90106';
      this.dataFormPage = true;
      this.dataSelect = false;
      this.selectAirtimeOrData = false;
    }else {
      this.selectedPaymentCode = '91309';
      this.dataFormPage = true;
      this.dataSelect = false;
      this.selectAirtimeOrData = false;
    }
  }

  buyAirtimeCheck(){
    this.isLoadingBtn = true;
    this.transactionService.getAuthenticatedUserWallet().subscribe((result: any) => {
      this.authUserWalletDetails = result;
      if (result.transaction_password ===  null){
        this.router.navigateByUrl('app/set-tranx-password');
      } else {
        this.isVisible = true;
      }
    });
  }

  airtimeSubmit(){
    this.isConfirmLoading = true;
    this.transactionService.verifyTransactionPassword(this.airtimeForm.value).subscribe((result: any) => {
      this.transactionPasswordDetails = result;
      if (result.passwordIsValid === true) {
        this.airtimeForm.value.merchantId = this.userWalletMerchantId;
        this.airtimeForm.value.uniqueKey = 'A06233E0-A72F-11EA-A0D3-5D6FFEC7EB33';
        this.airtimeForm.value.transactionReference = this.reference;
        this.airtimeForm.value.walletAccountNumber = this.userWalletNo;
        this.airtimeForm.value.paymentCode = this.selectedPaymentCode;
        this.transactionService.buyAirtime(this.airtimeForm.value).subscribe((result: any) => {
          this.airtimeTopupDetail = result;
          this.isLoadingBtn = false;
          this.successMessage = true;
          this.errorMessage = false;
          this.isVisible = false;
          this.isConfirmLoading = false;
          this.clearForm();
          this.airtimeFormPage = false;
        }, error => {
          this.successMessage = false;
          this.errorMessage = true;
          this.isLoadingBtn = false;
          this.isConfirmLoading = false;
          this.airtimeFormPage = false;
          this.isVisible = false;
          //this.notification.error( 'Airtime TopUp', error.error.message || error.error.responseMessage );
          this.errorToDisplay = error.error.message || error.error.responseMessage;
        });
      }
    }, error => {
      this.isConfirmLoading = false;
      this.notification.error( 'Validate Password', error.error.message || error.error.responseMessage );
    });
  }

}
