import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  forgetPasswordForm: FormGroup;

  isLoadingBtn = false;

  resetPasswordDetails: any;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private notification: NzNotificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.forgetPasswordForm = this.formBuilder.group({
      email: ['', Validators.email],
    });
  }

  get f(){
    return this.forgetPasswordForm.controls;
  }

  onSubmit(){
    this.isLoadingBtn = true;
    this.authenticationService.passwordReset(this.forgetPasswordForm.value).subscribe((result: any) => {
      this.resetPasswordDetails = result;
      this.notification.success( 'Reset Password', 'Password reset sent to your email' );
      this.router.navigateByUrl('login');
      this.isLoadingBtn = false;
    }, error => {
      this.isLoadingBtn = false;
      this.notification.error( 'Reset Password', error.error.message );
    });
  }



}
