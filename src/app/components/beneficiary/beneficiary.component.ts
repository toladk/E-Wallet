import { TransactionService } from './../transaction/service/transaction.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-beneficiary',
  templateUrl: './beneficiary.component.html',
  styleUrls: ['./beneficiary.component.css']
})
export class BeneficiaryComponent implements OnInit {

  beneficiaryForm: FormGroup;

  isLoadingBtnSub = false;
  isLoadingBtnValidate = false;
  beneFields = false;
  beneTableInfo = true;
  successMessage = false;
  errorMessage = false;
  beneAllPage = true;
  isVisible = false;
  showingBankCode = false;
  showingBeneWalletValidate = false;
  showingBeneName = false;

  allBeneficiaryTypes = [];
  allBank = [];
  allBeneficiaryList = [];
  beneficiaryDetails: any;
  errorToDisplay: any;
  beneficiaryName: any;
  accountDetails: any;
  deleteBenef: any;
  beneficiaryDetailId: any;
  walletNameView: any;
  walletDetails: any;
  accountNameView: any;
  accountNoDetails: any;

  constructor(
    private formBuilder: FormBuilder,
    private transactionService: TransactionService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.beneficiaryForm = this.formBuilder.group({
      beneficiaryName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      beneficiaryType: ['', Validators.required],
      beneficiaryBankCode: ['', Validators.required],
      beneficiaryAccountNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      walletName: [''],
    });

    this.getBeneficiaryTypes();
    this.getBanks();
    this.getAllBeneficiary();
  }

  // get beneficiary Types
  getBeneficiaryTypes(): void{
    this.transactionService.getBeneficiaryTypes().subscribe((result: any) => {
      this.allBeneficiaryTypes = result;
    });
  }
 // Get banks
  getBanks(): void{
    this.transactionService.getBanks().subscribe((result: any) => {
      this.allBank = result.bankList;
    });
  }

  addBeneButton(): void{
    this.beneFields = true;
    this.beneTableInfo = false;
  }

  // get all Beneficiary
  getAllBeneficiary(): void{
    this.transactionService.getBankBeneficiary().subscribe((result: any) => {
      this.allBeneficiaryList = result.beneficiaryDetails;
    });
  }

  // changing btw bank or wallet
  checkingBenType(): void{
    if (this.beneficiaryForm.value.beneficiaryType === 'Bank') {
      this.showingBankCode = true;
      this.showingBeneWalletValidate = false;
      this.showingBeneName = true;
    } else {
      this.showingBankCode = false;
      this.showingBeneWalletValidate = true;
      this.showingBeneName = false;
    }
  }

  // Validate Account No
  validateWallet(): void{
    this.isLoadingBtnValidate = true;
    this.transactionService.validateWallet(this.beneficiaryForm.value.beneficiaryAccountNumber).subscribe((result: any) => {
      this.walletDetails = result;
      this.isLoadingBtnValidate = false;
      this.notification.success('Wallet No', 'Wallet no validated successfully !!');
      this.walletNameView = this.walletDetails.walletName;
    }, error => {
      this.isLoadingBtnValidate = false;
      this.notification.error('Wallet No', error.error.responseMessage || error.error.message);
    });
  }
  validatAccountNo(): void{
    this.isLoadingBtnValidate = true;
    // tslint:disable-next-line:max-line-length
    this.transactionService.validateAccountNoBene(this.beneficiaryForm.value.beneficiaryAccountNumber, this.beneficiaryForm.value.beneficiaryBankCode).subscribe((result: any) => {
      this.accountNoDetails = result;
      this.isLoadingBtnValidate = false;
      this.notification.success('Account No', 'Account No validated successfully !!');
      this.accountNameView = this.accountNoDetails.accountName;
    }, error => {
      this.isLoadingBtnValidate = false;
      this.notification.error('Account No', error.error.responseMessage || error.error.message);
    });
  }

  // submit beneficiary
  submitBeneficiary(): void{
    this.isLoadingBtnSub = true;

    if (this.beneficiaryForm.value.beneficiaryType === 'Bank') {
      delete this.beneficiaryForm.value.walletName;
      this.transactionService.addBeneficiary(this.beneficiaryForm.value).subscribe((result: any) => {
        this.beneficiaryDetails = result.walletDetails;
        this.isLoadingBtnSub = false;
        this.beneficiaryForm.reset();
        this.successMessage = true;
        this.beneTableInfo = false;
        this.beneFields = false;
        this.beneAllPage = false;
      }, error => {
        this.isLoadingBtnSub = false;
        this.errorMessage = true;
        this.beneTableInfo = false;
        this.beneFields = false;
        this.beneAllPage = false;
        this.errorToDisplay = error.error.message || error.error.responseMessage;
        this.beneficiaryForm.reset();
      });
    } else {
      this.beneficiaryForm.value.beneficiaryBankCode = '030';
      delete this.beneficiaryForm.value.walletName;
      this.transactionService.addBeneficiary(this.beneficiaryForm.value).subscribe((result: any) => {
        this.beneficiaryDetails = result.walletDetails;
        this.isLoadingBtnSub = false;
        this.beneficiaryName = this.beneficiaryDetails.beneficiary_name;
        console.log('lalalala', this.beneficiaryName);
        this.beneficiaryForm.reset();
        this.successMessage = true;
        this.beneTableInfo = false;
        this.beneFields = false;
        this.beneAllPage = false;
      }, error => {
        this.isLoadingBtnSub = false;
        this.errorMessage = true;
        this.beneTableInfo = false;
        this.beneFields = false;
        this.beneAllPage = false;
        this.errorToDisplay = error.error.message || error.error.responseMessage;
        this.beneficiaryForm.reset();
      });
    }
  }

  // Delete Beneficiary
  deleteBeneficiary(id): void{
    this.transactionService.deleteBeneficiary(id).subscribe((result: any) => {
      this.deleteBenef = result;
      this.notification.success('Beneficiary', 'Beneficiary deleted successfully !!');
      this.getAllBeneficiary();
    }, error => {
      this.notification.error('Beneficiary', error.error.responseMessage || error.error.message);
    });
  }

  handleCancel(): void{
    this.isVisible = false;
  }

  beneficiaryInfo(id): void{
    this.isVisible = true;
    this.transactionService.getBeneficiaryById(id).subscribe((result: any) => {
      this.beneficiaryDetailId = result.beneficiaryDetails;
    }, error => {
      this.isVisible = true;
      this.notification.error('Beneficiary Details', error.error.responseMessage || error.error.message);
    });
  }

}
