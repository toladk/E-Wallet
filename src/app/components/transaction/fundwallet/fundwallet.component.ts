import { TransactionService } from './../service/transaction.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { creditCardType } from '../../addcard/cardJSFolder/card.js';

@Component({
  selector: 'app-fundwallet',
  templateUrl: './fundwallet.component.html',
  styleUrls: ['./fundwallet.component.css']
})
export class FundwalletComponent implements OnInit {

  monthArray = [
    { value: "01", name: "01"},
    { value: "02", name: "02"},
    { value: "03", name: "03"},
    { value: "04", name: "04"},
    { value: "05", name: "05"},
    { value: "06", name: "06"},
    { value: "07", name: "07"},
    { value: "08", name: "08"},
    { value: "09", name: "09"},
    { value: "10", name: "10"},
    { value: "11", name: "11"},
    { value: "12", name: "12"},
  ];

  yearArray = [
    { value: "2021", name: "2021"},
    { value: "2022", name: "2022"},
    { value: "2023", name: "2023"},
    { value: "2024", name: "2024"},
    { value: "2025", name: "2025"},
    { value: "2026", name: "2026"},
    { value: "2027", name: "2027"},
    { value: "2028", name: "2028"},
    { value: "2029", name: "2029"},
    { value: "2030", name: "2030"},
    { value: "2031", name: "2031"},
    { value: "2032", name: "2032"},
    { value: "2033", name: "2033"},
    { value: "2034", name: "2034"},
    { value: "2035", name: "2035"},
    { value: "2036", name: "2036"},
    { value: "2037", name: "2037"},
    { value: "2038", name: "2038"},
    { value: "2039", name: "2039"},
    { value: "2040", name: "2040"},
    { value: "2041", name: "2041"},
    { value: "2042", name: "2042"},
    { value: "2043", name: "2043"},
    { value: "2044", name: "2044"},
    { value: "2045", name: "2045"},
    { value: "2046", name: "2046"},
    { value: "2047", name: "2047"},
    { value: "2048", name: "2048"},
    { value: "2049", name: "2049"},
    { value: "2050", name: "2050"},
    { value: "2051", name: "2051"},
    { value: "2052", name: "2052"},
    { value: "2053", name: "2053"},
    { value: "2054", name: "2054"},
    { value: "2055", name: "2055"},
    { value: "2056", name: "2056"},
    { value: "2057", name: "2057"},
    { value: "2058", name: "2058"},
    { value: "2059", name: "2059"},
    { value: "2060", name: "2060"},
  ];

  fundWalletForm: FormGroup;



  selectTo = true;
  walletFormPage = false;
  successMessage = false;
  errorMessage = false;
  isLoadingBtn = false;
  isConfirmLoading = false;
  isVisible = false;
  isToken = false;
  tokenVisible = false;
  isVisibleOneoff = false;
  cardDetailsWalletFo = false;

  allCardList = [];
  allBankBeneficiaryList = [];

  authUserWalletDetails: any;
  authUserDetails: any;
  userCustomerId: any;
  userWalletNo: any;
  cardIdDetails: any;
  cardIdToSend: any;
  userWalletMerchantId: any;
  reference: any;
  fundWithCardDetails: any;
  errorToDisplay: any;
  transactionPasswordDetails: any;
  cardTypeText: any;
  oneOffInitiationIdToSend: any;
  tokenDetails: any;

  constructor(
    private formBuilder: FormBuilder,
    private transactionService: TransactionService,
    private notification: NzNotificationService,
    private router : Router,
  ) { }

  ngOnInit(): void {
    this.fundWalletForm = this.formBuilder.group({
      cardId: ['', Validators.required],
      walletAccountNumber: ['', Validators.required],
      transactionAmount: ['', Validators.required],
      transactionFee: ['', Validators.required],
      merchantId: ['', Validators.required],
      transactionReference: ['', Validators.required],
      narration: ['', Validators.required],
      uniqueKey: ['', Validators.required],
      transactionPassword: ['', Validators.required],
      amount: ['', Validators.required],
      fee: ['', Validators.required],
      customerId: ['', Validators.required],
      pan: ['', Validators.required],
      nameOnCard: ['', Validators.required],
      cvv: ['', Validators.required],
      expiryMonth: ['', Validators.required],
      expiryYear: ['', Validators.required],
      scheme: ['', Validators.required],
      cardHolder: ['', Validators.required],
      pin: ['', Validators.required],
      oneOffInitiationId: ['', Validators.required],
      otp: ['', Validators.required],
    });

    this.getAuthenticatedUser();
    this.getAuthenticatedUserWallet();
    this.getAllBankBeneficiary();
  }

  handleCancel(){
    this.isVisible = false;
  }
  handleTokenCancel(){
    this.tokenVisible = false;
  }


  clearForm(){
    this.fundWalletForm.reset();
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
      this.getAllCards();
    });
  }

  //get All Cards
  getAllCards(){
    this.transactionService.getAllCard(this.userCustomerId).subscribe((result: any) => {
      this.allCardList = result.cardDetails;
    });
  }

  //get All Cards
  getAllBankBeneficiary(): void{
    this.transactionService.getBankBeneficiary().subscribe((result: any) => {
      this.allBankBeneficiaryList = result.beneficiaryDetails;
    });
  }

  //get Card By ID
  getCardById(){
    if (this.fundWalletForm.value.cardId === 'oneOff'){
      this.cardDetailsWalletFo = true;
      this.selectTo = false;
    } else {
      this.transactionService.getCardById(this.fundWalletForm.value.cardId).subscribe((result: any) => {
        this.cardIdDetails = result.cardDetails;

        this.cardIdToSend = this.cardIdDetails.cardId;
        this.selectTo = false;
        this.walletFormPage = true;
      });
    }
  }

  // get timestamp and generate reference
  generateReference(){
    const stamp = Math.floor(Date.now() / 1000);
    const transacReference = this.userWalletMerchantId;
    this.reference = stamp + transacReference;
  }

  // For Token input and check
  submitWithNewCard(){
    this.isLoadingBtn = true;
    this.fundWalletForm.value.fee = 15;
    this.fundWalletForm.value.merchantId = this.userWalletMerchantId;
    this.fundWalletForm.value.customerId = this.userCustomerId;
    this.fundWalletForm.value.transactionReference = this.reference;
    this.fundWalletForm.value.scheme = this.cardTypeText;
    this.fundWalletForm.value.expiryYear = this.fundWalletForm.value.expiryYear.slice(2);
    this.fundWalletForm.value.nameOnCard =  this.fundWalletForm.value.cardHolder;
    this.transactionService.fundWalletWithCardOneOff(this.fundWalletForm.value).subscribe((result: any) => {
      this.fundWithCardDetails = result.cardResponseDetails;
      this.clearForm();
      this.tokenVisible = true;
      this.isLoadingBtn = false;

      this.oneOffInitiationIdToSend = this.fundWithCardDetails.oneOffInitiationId;
    }, error => {
      this.isLoadingBtn = false;
      this.notification.error( 'Fund Wallet', error.error.message || error.error.responseMessage );
    });
  }
  submitCardToken(){
    this.isLoadingBtn = true;
    this.isVisible = true;
  }

  // Fund Wallet with Card Password
  fundWalletCheck(){
    this.isLoadingBtn = true;
    this.transactionService.getAuthenticatedUserWallet().subscribe((result: any) => {
      this.authUserWalletDetails = result;
      if (result.transaction_password ===  null){
        this.router.navigateByUrl('app/set-tranx-password');
      } else {
        this.isLoadingBtn = false;
        this.isVisible = true;
      }
    });
  }
  fundWalletWithCard(){
    this.isConfirmLoading = true;
    this.fundWalletForm.value.transactionReference = this.reference;
    this.transactionService.verifyTransactionPassword(this.fundWalletForm.value).subscribe((result: any) => {
      this.transactionPasswordDetails = result;
      if (result.passwordIsValid === true) {
          if (this.fundWalletForm.value.cardId !== 'oneOff'){
            this.fundWalletForm.value.cardId = this.cardIdToSend;
            this.fundWalletForm.value.transactionFee = 100;
            this.fundWalletForm.value.merchantId = this.userWalletMerchantId;
            this.fundWalletForm.value.uniqueKey = 'A06233E0-A72F-11EA-A0D3-5D6FFEC7EB33';
            this.transactionService.fundWalletWithCard(this.fundWalletForm.value).subscribe((result: any) => {
              this.fundWithCardDetails = result;
              this.isLoadingBtn = false;
              this.successMessage = true;
              this.errorMessage = false;
              this.walletFormPage = false;
              this.isVisible = false;
              this.isConfirmLoading = false;
              this.clearForm();
            }, error => {
              this.successMessage = false;
              this.errorMessage = true;
              this.isLoadingBtn = false;
              this.walletFormPage = false;
              this.isVisible = false;
              this.isConfirmLoading = false;
              this.notification.error( 'Fund Wallet', error.error.message || error.error.responseMessage );
              this.errorToDisplay = error.error.message || error.error.responseMessage;
            });
          } else {
            this.fundWalletForm.value.oneOffInitiationId = this.oneOffInitiationIdToSend;
            this.fundWalletForm.value.merchantId = this.userWalletMerchantId;
            this.transactionService.fundWalletWithCardOneOffToken(this.fundWalletForm.value).subscribe((result: any) => {
              this.tokenDetails = result;
              this.isLoadingBtn = false;
              this.successMessage = true;
              this.cardDetailsWalletFo = false;
              this.isVisible = false;
              this.clearForm();
            }, error => {
              this.errorMessage = false;
              this.isLoadingBtn = false;
              this.cardDetailsWalletFo = false;
              this.isVisible = false;
              this.notification.error( 'Token', error.error.message || error.error.responseMessage );
            });
          }
      }
    }, error => {
      this.isVisible = false;
      this.isConfirmLoading = false;
      this.isLoadingBtn = false;
      this.notification.error( 'Validate Password', error.error.message || error.error.responseMessage );
    });
  }

  // for card type
  gettingType(){
    const cardType = creditCardType(this.fundWalletForm.value.pan);
    this.cardTypeText = cardType;
  }

}
