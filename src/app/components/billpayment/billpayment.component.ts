import { TransactionService } from './../transaction/service/transaction.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billpayment',
  templateUrl: './billpayment.component.html',
  styleUrls: ['./billpayment.component.css']
})
export class BillpaymentComponent implements OnInit {

  billerForm: FormGroup;

  isLoadingBtnValidate = false;
  isLoadingBtnSub = false;
  enableAmount = true;
  disabledAmount = false;
  firstPage = true;
  secondPage = false;
  isVisible = false;
  isConfirmLoading = false;
  successMessage = false;
  errorMessage = false;

  allBillerCategoryList = [];
  allBillerList = [];
  allBillerPackageList = [];

  paymentDetailsAmount: number;
  paymentDetailsItemFee: number;
  validationDetails: any;
  paymentDetailsCode: any;
  authUserWalletDetails: any;
  billPaymentDetails: any;
  addBillPaymentInfo: any;
  errorToDisplay: any;
  authUserDetails: any;
  userWalletNo: any;
  userCustomerId: any;
  userWalletMerchantId: any;
  reference: any;

  constructor(
    private formBuilder: FormBuilder,
    private transactionService: TransactionService,
    private notification: NzNotificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.billerForm = this.formBuilder.group({
      billerCategory: ['', Validators.required],
      biller: ['', Validators.required],
      package: ['', Validators.required],
      customerId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      fee: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      transactionPassword: ['', Validators.required],
      paymentCode: ['', Validators.required],
      walletAccountNumber: ['', Validators.required],
      merchantId: ['', Validators.required],
      transactionReference: ['', Validators.required],
      uniqueKey: ['', Validators.required],
    });

    this.getAllBillerCategory();
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

      this.userWalletNo = this.authUserWalletDetails.wallet_number;
      this.userCustomerId = this.authUserWalletDetails.customer_id;
      this.userWalletMerchantId = this.authUserWalletDetails.merchant_id;
      this.generateReference();
    });
  }

  // get timestamp and generate reference
  generateReference(): void{
    const stamp = Math.floor(Date.now() / 1000);
    const transacReference = this.userWalletMerchantId;
    this.reference = stamp + transacReference;
  }

  handleCancel(): void{
    this.isVisible = false;
  }

  getBillPaymentForm(): void{
    this.firstPage = false;
    this.secondPage = true;
  }

  getAllBillerCategory(): void{
    this.transactionService.getBillerCategory().subscribe((result: any) => {
      this.allBillerCategoryList = result.categorys;
    });
  }

  getBillerCategoryById(): void{
    this.transactionService.getBillerCategoryById(this.billerForm.value.billerCategory).subscribe((result: any) => {
      this.allBillerList = result.billers;
    });
  }

  getBillerById(): void{
    this.transactionService.getBillerPaymentById(this.billerForm.value.biller).subscribe((result: any) => {
      this.allBillerPackageList = result.paymentitems;
    });
  }

  getPaymentDetailsFromArrayList(): void{
    this.allBillerPackageList.find(obj => {
      if (this.billerForm.value.package === obj.paymentitemid) {
        this.paymentDetailsAmount = obj.amount / 100;
        this.paymentDetailsItemFee = obj.itemFee / 100;
        this.paymentDetailsCode = obj.paymentCode;
        if (obj.isAmountFixed === true){
          this.enableAmount = false;
          this.disabledAmount = true;
        } else {
          this.enableAmount = true;
          this.disabledAmount = false;
        }
      }
    });
  }

  validateCustomerID(): void{
    this.isLoadingBtnValidate = true;
    this.transactionService.validateCustomer(this.billerForm.value.customerId, this.paymentDetailsCode).subscribe((result: any) => {
      this.validationDetails = result;
      this.notification.success('Customer ID', 'Customer ID validated successfully !!');
      this.isLoadingBtnValidate = false;
    }, error => {
      this.notification.error('Customer ID', error.error.message || error.error.respMessage);
      this.isLoadingBtnValidate = false;
    });
  }

  submitBillerPayment(): void{
    this.isLoadingBtnSub = true;
    this.transactionService.getAuthenticatedUserWallet().subscribe((result: any) => {
      this.authUserWalletDetails = result;
      if (result.transaction_password ===  null){
        this.router.navigateByUrl('app/set-tranx-password');
      } else {
        this.isVisible = true;
      }
    });
  }

  billerPaymentSubmit(): void{
    this.isConfirmLoading = true;
    this.transactionService.verifyTransactionPassword(this.billerForm.value).subscribe((result: any) => {
      this.billPaymentDetails = result;
      if (result.passwordIsValid === true){
        delete this.billerForm.value.transactionPassword;
        delete this.billerForm.value.billerCategory;
        delete this.billerForm.value.biller;
        delete this.billerForm.value.package;

        this.billerForm.value.merchantId = this.userWalletMerchantId;
        this.billerForm.value.uniqueKey = 'A06233E0-A72F-11EA-A0D3-5D6FFEC7EB33';
        this.billerForm.value.transactionReference = this.reference;
        this.billerForm.value.walletAccountNumber = this.userWalletNo;
        this.billerForm.value.paymentCode = this.paymentDetailsCode;
        this.transactionService.addBillPayment(this.billerForm.value).subscribe((Result: any) => {
          this.addBillPaymentInfo = result;
          this.isLoadingBtnSub = false;
          this.isConfirmLoading = false;
          this.isVisible = false;
          this.firstPage = false;
          this.secondPage = false;
          this.successMessage = true;
          this.errorMessage = false;
          this.billerForm.reset();
        }, error => {
          this.isLoadingBtnSub = false;
          this.isConfirmLoading = false;
          this.isVisible = false;
          this.firstPage = false;
          this.secondPage = false;
          this.successMessage = false;
          this.errorMessage = true;
          this.billerForm.reset();
          this.errorToDisplay = error.error.message || error.error.responseMessage;
        });
      }
    }, error => {
      this.isConfirmLoading = false;
      this.notification.error('Bill Payment', error.error.message || error.error.responseMessage);
    });
  }

}
