import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  changePasswordForm: FormGroup;

  isLoadingBtn = false;

  changePassowrdDetail: any;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private notification: NzNotificationService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      newConfirmPassword: ['', [Validators.required]],
    }, {
      validator: this.ConfirmedValidator('newPassword', 'newConfirmPassword')
    });
  }

  get f(){
    return this.changePasswordForm.controls;
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

  submitChangePassword(){
    this.isLoadingBtn = false;
    this.authenticationService.changePassword(this.changePasswordForm.value).subscribe((result: any) => {
      this.changePassowrdDetail = result;
      this.notification.success( 'Change Password', result.message );
      this.tokenService.logout();
      this.authenticationService.changeAuthStatus(false);
      this.router.navigateByUrl('login');
      this.isLoadingBtn = false;
    }, error => {
      this.isLoadingBtn = false;
      this.notification.error( 'Change Password', error.error.message );
    });
  }

}
