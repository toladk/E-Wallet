import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TransactionService } from '../transaction/service/transaction.service';
import { creditCardType } from '../addcard/cardJSFolder/card.js';

@Component({
  selector: 'app-addcard',
  templateUrl: './addcard.component.html',
  styleUrls: ['./addcard.component.css']
})
export class AddcardComponent implements OnInit {

  addCardForm: FormGroup;
  addCardOtpForm: FormGroup;

  MonthArray = [
    { value: "", name: "Select Month"},
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

  YearArray = [
    { value: "", name: "Select Year"},
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

  isVisible = false;
  passVisible = false;
  isLoadingBtn = false;
  isConfirmLoading = false;
  isConfirmLoadingPass = false;

  authUserDetails: any;
  authUserWalletDetails: any;
  customerIdToSend: any;
  cardTypeText: any;
  addCardDetails: any;
  addCardDetails2: any;
  applicationIdToSend: any;
  bankList = [];
  cardIdTosend: any;
  transactionReferenceTosend: any;
  addCardOtpDetail: any;
  transPasswordDetail: any;

  constructor(
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    this.addCardForm = this.formBuilder.group({
      customerId: ['', Validators.required],
      pan: ['', Validators.required],
      cvv: ['', Validators.required],
      cardExpiryDate: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
      cardScheme: ['', Validators.required],
      nameOnCard: ['', Validators.required],
      cardHolder: ['', Validators.required],
      pin: ['', Validators.required],
      bankName: ['', Validators.required],
      applicationId: ['', Validators.required],
      scheme: ['', Validators.required],
    });

    this.addCardOtpForm = this.formBuilder.group({
      cardId: ['', Validators.required],
      transactionReference: ['', Validators.required],
      otp: ['', Validators.required],
      applicationId: ['', Validators.required],
      transactionPassword: ['', Validators.required],
    });

    this.getAuthenticatedUserWallet();
    this.getAuthenticatedUser();
    this.getBanks();

  }

  handleCancel(){
    this.isVisible = false;
  }
  handlePassCancel(){
    this.passVisible = false;
  }

  clearForm(){
    this.addCardForm.reset();
    this.addCardOtpForm.reset();
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

      this.customerIdToSend = this.authUserWalletDetails.customer_id;
      this.applicationIdToSend = this.authUserWalletDetails.application_id;

      console.log('App ID forms', this.applicationIdToSend);
      console.log('Customer Id', this.customerIdToSend);
    });
  }

  // for card type
  gettingType(){
    const cardType = creditCardType(this.addCardForm.value.pan);
    this.cardTypeText = cardType;
  }

  // to add card
  addcard(){
    this.isLoadingBtn = true;
    const sliceYear = this.addCardForm.value.year.slice(2);
    this.addCardForm.value.cardExpiryDate = `${this.addCardForm.value.month}/${sliceYear}`;
    this.addCardForm.value.customerId = this.customerIdToSend;
    this.addCardForm.value.applicationId = 'ewallet';
    this.addCardForm.value.cardScheme = this.cardTypeText;
    this.addCardForm.value.scheme = this.cardTypeText;
    this.addCardForm.value.cardHolder = this.addCardForm.value.nameOnCard;

    delete this.addCardForm.value.month;
    delete this.addCardForm.value.year;
    this.transactionService.addCard(this.addCardForm.value).subscribe((result: any) => {
      this.addCardDetails = result.cardResponseDetails;
      this.addCardDetails2 = result;
      this.isLoadingBtn = false;
      this.isVisible = true;
      this.notification.success( 'Add Card', result.message || result.responseMessage );

      this.cardIdTosend = this.addCardDetails.cardId;
      this.transactionReferenceTosend = this.addCardDetails.transactionRef;
    }, error => {
      this.isLoadingBtn = false;
      this.notification.error( 'Add Card', error.error.message || error.error.responseMessage || error.error.responseCode);
    });
  }
  submitCardOtp(){
    this.isConfirmLoading = true;
    this.passVisible = true;
  }

  submitTransPassword(){
    this.isConfirmLoadingPass = true;
    this.transactionService.verifyTransactionPassword(this.addCardOtpForm.value).subscribe((result: any) => {
      this.transPasswordDetail = result;
      if (result.passwordIsValid === true){
        this.addCardOtpForm.value.cardId = this.cardIdTosend;
        this.addCardOtpForm.value.transactionReference = this.transactionReferenceTosend;
        this.addCardOtpForm.value.applicationId = 'ewallet';
        this.transactionService.addCardOtp(this.addCardOtpForm.value).subscribe((result: any) => {
          this.addCardOtpDetail = result;
          this.notification.success( 'Token', result.message || result.responseMessage );
          this.isVisible = false;
          this.cardTypeText = '';
          this.isConfirmLoading = false;
          this.passVisible = true;
          this.clearForm();
          this.passVisible = false;
          this.isConfirmLoadingPass = false;
        }, error => {
          this.isConfirmLoading = false;
          this.notification.error( 'Token', error.error.message || error.error.responseMessage );
        });
      }
    }, error => {
      this.isConfirmLoadingPass = true;
      this.notification.error( 'Validate Password', error.error.message || error.error.responseMessage );
    });
  }

  //get Banks
  getBanks(){
    this.transactionService.getBanks().subscribe((result: any) => {
      this.bankList = result.bankList;
    });
  }

}



