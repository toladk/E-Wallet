import { AuthenticationService } from './../service/authentication.service';
import { JarwisService } from './../service/jarwis.service';
import { TokenService } from './../service/token.service';
import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  passwordVisible = false;
  password?: string;

  loginForm: FormGroup;

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
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(){
      this.isLoadingBtn = true;
      const encrptPass = btoa(this.loginForm.value.password);
      this.jarwis.login(this.loginForm.value).subscribe((result: any) => {
        if (result.errors === 'The User needs to change the default password'){
          this.handleResponseForChangePassword(result);
        } else if (result.data.requires_two_factor === true){
          localStorage.setItem('username', this.loginForm.value.username);
          localStorage.setItem('password', encrptPass);
          this.router.navigateByUrl('/two-factor');
        } else {
          this.handleResponse(result);
        }
      }, error => {
        this.handleError(error);
      });
    }

    handleResponse(data){
      localStorage.setItem('username', this.loginForm.value.username);
      this.token.handle(data.data.access_token);
      this.authenticationService.changeAuthStatus(true);
      this.router.navigateByUrl('app/all-dashboard').then(() => {window.location.reload(); });
      this.notification.success( 'Login', 'Loggedin Successfully !!' );
      this.isLoadingBtn = false;
    }

    handleResponseForChangePassword(data){
      localStorage.setItem('username', this.loginForm.value.username);
      this.token.handle(data.data.access_token);
      this.authenticationService.changeAuthStatus(true);
      this.router.navigateByUrl('app/change-password').then(() => {window.location.reload(); });
      this.notification.success( 'Login', 'Loggedin Successfully !!' );
      this.isLoadingBtn = false;
    }

    handleError(error){
      this.isLoadingBtn = false;
      error = this.notification.error( 'Login', error.error.Error || error.error.errors );
        // console.log(error);
    }

}
