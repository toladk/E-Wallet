import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { UseErrorInterceptor } from '../app/authentication/service/error.interceptor';

// ANT JS;
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzRadioModule } from 'ng-zorro-antd/radio';


import { LoginComponent } from './authentication/login/login.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplayoutComponent } from './layout/applayout/applayout.component';
import { MerchantlayoutComponent } from './layout/merchantlayout/merchantlayout.component';
import { UserlayoutComponent } from './layout/userlayout/userlayout.component';
import { AdminlayoutComponent } from './layout/adminlayout/adminlayout.component';
import { UserdashboardComponent } from './components/user/userdashboard/userdashboard.component';
import { AdmindashboardComponent } from './components/admin/admindashboard/admindashboard.component';
import { MerchantdashboardComponent } from './components/merchant/merchantdashboard/merchantdashboard.component';
import { ForgetpasswordComponent } from './authentication/forgetpassword/forgetpassword.component';
import { AlldashboardComponent } from './alldashboard/alldashboard.component';
import { ChangepasswordComponent } from './authentication/changepassword/changepassword.component';


// Imported Services
import { TransactionService } from './components/transaction/service/transaction.service';
import { FundwalletComponent } from './components/transaction/fundwallet/fundwallet.component';
import { FundwithdrawalComponent } from './components/transaction/fundwithdrawal/fundwithdrawal.component';
import { TwofactorComponent } from './authentication/twofactor/twofactor.component';
import { FundtransferComponent } from './components/transaction/fundtransfer/fundtransfer.component';
import { TranxsetpasswordComponent } from './components/transaction/tranxsetpassword/tranxsetpassword.component';
import { TranxsettranspasswordComponent } from './components/transaction/tranxsettranspassword/tranxsettranspassword.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { AddcardComponent } from './components/addcard/addcard.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AirtimeComponent } from './components/transaction/airtime/airtime.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BeneficiaryComponent } from './components/beneficiary/beneficiary.component';
import { BillpaymentComponent } from './components/billpayment/billpayment.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    ApplayoutComponent,
    MerchantlayoutComponent,
    UserlayoutComponent,
    AdminlayoutComponent,
    UserdashboardComponent,
    AdmindashboardComponent,
    MerchantdashboardComponent,
    ForgetpasswordComponent,
    AlldashboardComponent,
    ChangepasswordComponent,
    TwofactorComponent,
    FundtransferComponent,
    TranxsetpasswordComponent,
    TranxsettranspasswordComponent,
    SignupComponent,
    AddcardComponent,
    FundwalletComponent,
    FundwithdrawalComponent,
    AirtimeComponent,
    FooterComponent,
    BeneficiaryComponent,
    BillpaymentComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzToolTipModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzMessageModule,
    NzTabsModule,
    NzTableModule,
    NzDrawerModule,
    NzFormModule,
    NzSelectModule,
    NzIconModule,
    NzDatePickerModule,
    NzInputModule,
    NzStepsModule,
    NzListModule,
    NzResultModule,
    NzGridModule,
    NzUploadModule,
    NzNotificationModule,
    NzPopconfirmModule,
    NzInputNumberModule,
    NzSkeletonModule,
    NzBadgeModule,
    NzModalModule,
    NzCollapseModule,
    NzDropDownModule,
    NzRadioModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [TransactionService, UseErrorInterceptor, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
