import { environment } from './../../../environments/environment';
import { AuthenticationService } from './../service/authentication.service';
import { JarwisService } from './../service/jarwis.service';
import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;

  isLoadingBtn = false;
  isLoadingBtn2 = false;

  appIdToSend = 'e-wallet';
  loginUrlToSend = `http://localhost:7983/login`;
  passwordResetUrlToSend = `http://localhost:7983/forget-password`;
  errorPageUrlToSend = `http://localhost:7983/error`;
  uniqueKeyToSend = 'E6A9C647-B9E1-446A-A7F6-C33EDFEBFDB1';

  allMerchantList = [];
  clicked: boolean;
  validateBvnDetails: any;
  bvnPhoneNumber: any;
  signUpResult: any;
  codeBvnPhoneNumber = '+234';

  constructor(
    private formBuilder: FormBuilder,
    private jarwis: JarwisService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.email],
      appId: ['', Validators.required],
      bvn: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      merchantId: ['', Validators.required],
      address: ['', Validators.required],
      loginUrl: ['', Validators.required],
      passwordResetUrl: ['', Validators.required],
      errorPageUrl: ['', Validators.required],
      uniqueKey: ['', Validators.required],
      codePhoneNumber: ['', Validators.required],
    });

    this.getAllMerchants();

  }

  clear(){
    this.signUpForm.reset();
  }

  // get All Merchants
  getAllMerchants(){
    this.authenticationService.getMerchants().subscribe((result: any) => {
      this.allMerchantList = result.merchants;
    });
  }

  // To Validate bvn and enable Submit buttom
  validateBvn(){
    this.isLoadingBtn = true;
    this.authenticationService.validateBvn(this.signUpForm.value.bvn).subscribe((result: any) => {
      this.validateBvnDetails = result;
      this.bvnPhoneNumber = this.validateBvnDetails.bvnDetails.phoneNumber.slice(1);
      this.clicked = true;
      this.notification.success( 'Validate Bvn', result.responseMessage );
      this.isLoadingBtn = false;
    }, error => {
      this.isLoadingBtn = false;
      this.notification.error( 'Validate Bvn', error.error.message || error.error.responseMessage );
    });
  }

  submit(){
    this.isLoadingBtn2 = true;
    this.signUpForm.value.appId = this.appIdToSend;
    this.signUpForm.value.loginUrl = this.loginUrlToSend;
    this.signUpForm.value.passwordResetUrl = this.passwordResetUrlToSend;
    this.signUpForm.value.errorPageUrl = this.errorPageUrlToSend;
    this.signUpForm.value.uniqueKey = this.uniqueKeyToSend;
    this.signUpForm.value.phoneNumber = `${this.signUpForm.value.codePhoneNumber}${this.signUpForm.value.phoneNumber}`;
    delete this.signUpForm.value.codePhoneNumber;
    this.jarwis.signup(this.signUpForm.value).subscribe((result: any) => {
      this.signUpResult = result;
      this.notification.success( 'Sign Up', 'Sign up successfuly !!' );
      this.isLoadingBtn2 = false;
      this.clear();
      this.router.navigateByUrl('/login')
    }, error => {
      this.isLoadingBtn2 = false;
      this.notification.error( 'Sign Up', error.error.message || error.error.responseMessage || error.error.errors[0].email );
    });
  }

}
