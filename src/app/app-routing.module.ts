import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './authentication/service/auth.guard';
import { AfterLoginService } from './authentication/service/after-login.service';
import { BeforeLoginService } from './authentication/service/before-login.service';
import { AddcardComponent } from './components/addcard/addcard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Imported Master Component
import { ApplayoutComponent } from './layout/applayout/applayout.component';
import { UserlayoutComponent } from './layout/userlayout/userlayout.component';
import { AdminlayoutComponent } from './layout/adminlayout/adminlayout.component';
import { MerchantlayoutComponent } from './layout/merchantlayout/merchantlayout.component';

// App Page
import { AlldashboardComponent } from './alldashboard/alldashboard.component';
import { FundtransferComponent } from './components/transaction/fundtransfer/fundtransfer.component';
import { TranxsettranspasswordComponent } from './components/transaction/tranxsettranspassword/tranxsettranspassword.component';
import { TranxsetpasswordComponent } from './components/transaction/tranxsetpassword/tranxsetpassword.component';
import { FundwithdrawalComponent } from './components/transaction/fundwithdrawal/fundwithdrawal.component';
import { FundwalletComponent } from './components/transaction/fundwallet/fundwallet.component';
import { AirtimeComponent } from './components/transaction/airtime/airtime.component';

// Users Page
import { UserdashboardComponent } from './components/user/userdashboard/userdashboard.component';

// Admin Page
import { AdmindashboardComponent } from './components/admin/admindashboard/admindashboard.component';

// Merchant Page
import { MerchantdashboardComponent } from './components/merchant/merchantdashboard/merchantdashboard.component';


import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { LoginComponent } from './authentication/login/login.component';
import { ForgetpasswordComponent } from './authentication/forgetpassword/forgetpassword.component';
import { ChangepasswordComponent } from './authentication/changepassword/changepassword.component';
import { TwofactorComponent } from './authentication/twofactor/twofactor.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { BeneficiaryComponent } from './components/beneficiary/beneficiary.component';
import { BillpaymentComponent } from './components/billpayment/billpayment.component';



const routes: Routes = [
  {
    path : '',
    redirectTo : 'login',
    pathMatch : 'full'
  },
  {
    path : 'signup',
    component : SignupComponent ,
  },
  {
    path : 'login',
    component : LoginComponent ,
  },
  {
    path : 'forget-password',
    component : ForgetpasswordComponent
  },
  {
    path : 'two-factor',
    component : TwofactorComponent
  },
  {
    path : 'main-dashboard',
    component : DashboardComponent,
  },

  // App Module
  {
    path : 'app',
    component : ApplayoutComponent,
    canActivate: [AuthGuard],
    children : [
      {
        path : '',
        redirectTo : 'all-dashboard',
        pathMatch : 'full'
      },
      {
        path : 'all-dashboard',
        component : AlldashboardComponent,
      },
      {
        path : 'change-password',
        component : ChangepasswordComponent,
      },
      {
        path : 'fund-transfer',
        component : FundtransferComponent
      },
      {
        path : 'fund-wallet',
        component : FundwalletComponent
      },
      {
        path : 'fund-withdrawal',
        component : FundwithdrawalComponent
      },
      {
        path : 'set-password',
        component : TranxsetpasswordComponent
      },
      {
        path : 'set-tranx-password',
        component : TranxsettranspasswordComponent
      },
      {
        path : 'add-card',
        component : AddcardComponent
      },
      {
        path : 'beneficiary',
        component : BeneficiaryComponent
      },
      {
        path : 'airtime',
        component : AirtimeComponent
      },
      {
        path : 'bill-payment',
        component : BillpaymentComponent
      },
      {
        path : 'profile',
        component : UserProfileComponent
      },
      {
        path : '**',
        redirectTo : ''
      }
    ]
  },

  // User Module
  {
    path : 'user',
    component : UserlayoutComponent ,
    children : [
      {
        path : '',
        redirectTo : 'user-dashboard',
        pathMatch : 'full'
      },
      {
        path : 'user-dashboard',
        component : UserdashboardComponent,
      },
      {
        path : '**',
        redirectTo : ''
      }
    ]
  },

  // Admin Module
  {
    path : 'admin',
    component : AdminlayoutComponent ,
    children : [
      {
        path : '',
        redirectTo : 'admin-dashboard',
        pathMatch : 'full'
      },
      {
        path : 'admin-dashboard',
        component : AdmindashboardComponent,
      },
      {
        path : '**',
        redirectTo : ''
      }
    ]
  },

  // Merchant Module
  {
    path : 'merchant',
    component : MerchantlayoutComponent ,
    children : [
      {
        path : '',
        redirectTo : 'merchant-dashboard',
        pathMatch : 'full'
      },
      {
        path : 'merchant-dashboard',
        component : MerchantdashboardComponent,
      },
      {
        path : '**',
        redirectTo : ''
      }
    ]
  },

  {
    path : '**',
    redirectTo : ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
