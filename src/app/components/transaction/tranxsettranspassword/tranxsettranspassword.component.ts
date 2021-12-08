import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TransactionService } from './../service/transaction.service';

@Component({
  selector: 'app-tranxsettranspassword',
  templateUrl: './tranxsettranspassword.component.html',
  styleUrls: ['./tranxsettranspassword.component.css']
})
export class TranxsettranspasswordComponent implements OnInit {

  tranxPasswordForm: FormGroup;

  passwordVisible = false;
  passwordVisible2 = false;

  isLoadingBtn = false;
  isVisible = false;
  isConfirmLoading = false;

  passwordOtpDetails: any;
  transactionPasswordDetails: any;
  authorizationTransactionType = 'Password';

  constructor(
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    this.tranxPasswordForm = this.formBuilder.group({
      otp: ['', Validators.required],
      otp1: ['', Validators.required],
      otp2: ['', Validators.required],
      otp3: ['', Validators.required],
      authorizationType: ['', Validators.required],
      transactionPassword: ['', [Validators.required]],
      confirmTransactionPassword: ['', [Validators.required]],
    }, {
      validator: this.ConfirmedValidator('transactionPassword', 'confirmTransactionPassword')
    });
  }

  get f(){
    return this.tranxPasswordForm.controls;
  }

  // for password and confirm password validation
  ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
      }
    }

    handleCancel(){
      this.isVisible = false;
    }

    handleOk(): void {
      this.isConfirmLoading = true;
      setTimeout(() => {
        this.isVisible = false;
        this.isConfirmLoading = false;
      }, 1000);
    }

  clearForm(){
    this.tranxPasswordForm.reset();
  }

  getPasswordOtp(){
    this.isLoadingBtn = true;
    this.transactionService.changeTransPasswordOtp().subscribe((result: any) => {
      this.passwordOtpDetails = result;
      this.isVisible = true;
      this.notification.success( 'Token', result.responseMessage );
      this.isLoadingBtn = false;
    }, error => {
      this.isLoadingBtn = false;
      this.notification.error( 'Token', error.error.message );
    });
  }

  submitChangeTranxPassword(){
    this.isConfirmLoading = true;
    this.tranxPasswordForm.value.otp = this.tranxPasswordForm.value.otp1 + this.tranxPasswordForm.value.otp2 + this.tranxPasswordForm.value.otp3;
    delete this.tranxPasswordForm.value.otp1;
    delete this.tranxPasswordForm.value.otp2;
    delete this.tranxPasswordForm.value.otp3;
    this.tranxPasswordForm.value.authorizationType = this.authorizationTransactionType;
    this.transactionService.postTransactionPassword(this.tranxPasswordForm.value).subscribe((result: any) => {
      this.transactionPasswordDetails = result;
      this.notification.success( 'Transaction Password', result.responseMessage );
      this.isVisible = false;
      this.isConfirmLoading = false;
      this.clearForm();
    }, error => {
      this.isVisible = false;
      this.isConfirmLoading = false;
      this.clearForm();
      this.notification.error( 'Transaction Password', error.error.message );
    });
  }

}
