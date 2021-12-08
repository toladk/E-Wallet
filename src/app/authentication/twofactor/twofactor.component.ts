import { AuthenticationService } from './../service/authentication.service';
import { JarwisService } from './../service/jarwis.service';
import { TokenService } from './../service/token.service';
import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-twofactor',
  templateUrl: './twofactor.component.html',
  styleUrls: ['./twofactor.component.css']
})
export class TwofactorComponent implements OnInit {

  twoFactorForm: FormGroup;

  isLoadingBtn = false;

  constructor(
    private formBuilder: FormBuilder,
    private jarwis: JarwisService,
    private token: TokenService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.twoFactorForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      token: ['', Validators.required],
      token1: ['', Validators.required],
      token2: ['', Validators.required],
      token3: ['', Validators.required],
      token4: ['', Validators.required],
    });
  }

  onSubmitTwoFactor(){
    this.isLoadingBtn = true;
    const decryptPass = atob(localStorage.getItem('password'));
    this.twoFactorForm.value.username = localStorage.getItem('username');
    this.twoFactorForm.value.password = decryptPass;
    // tslint:disable-next-line:max-line-length
    this.twoFactorForm.value.token = this.twoFactorForm.value.token1 + this.twoFactorForm.value.token2 + this.twoFactorForm.value.token3 + this.twoFactorForm.value.token4;
    delete this.twoFactorForm.value.token1;
    delete this.twoFactorForm.value.token2;
    delete this.twoFactorForm.value.token3;
    delete this.twoFactorForm.value.token4;
    this.authenticationService.twoFactor(this.twoFactorForm.value).subscribe((result: any) => {
      if (result.data.requires_two_factor === false){
        this.handleResponse(result);
      } else if (result.message === 'Invalid Token'){
        this.isLoadingBtn = false;
        this.notification.success( 'Token', result.message );
      }
    }, error => this.handleError(error)
    );
  }

  handleResponse(data){
    this.notification.success( 'Login', 'Login Successfully !!' );
    this.token.handle(data.data.access_token);
    this.authenticationService.changeAuthStatus(true);
    this.isLoadingBtn = false;
    this.router.navigateByUrl('app/all-dashboard').then(() => {window.location.reload();});
  }

  handleError(error){
    this.isLoadingBtn = false;
    this.notification.error( 'Login', error.error.message );
  }

}
