import { AuthenticationService } from './../authentication/service/authentication.service';
import { AbstractType, Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-alldashboard',
  templateUrl: './alldashboard.component.html',
  styleUrls: ['./alldashboard.component.css'],
  providers: [ DatePipe ]
})
export class AlldashboardComponent implements OnInit {

  last10TransactionList = [];
  allCardList = [];

  showCard = true;
  authUserDetails: any;
  authUserWalletDetails: any;
  userWalletNumber: any;
  date: Date;
  todayDate: any;
  userCustomerId: any;

  slideActive: any;
routaLink: '/app/add-card';
cardBody: '<div class="row"><div class="col-auto"><i class="material-icons vm text-template">credit_card</i></div><div class="col pl-0"><h6 class="mb-1 text-white"></h6></div></div>';

  constructor(
    private authenticationService: AuthenticationService,
    private datepipe: DatePipe,
  ) { }

  ngOnInit(): void {

    this.getAuthenticatedUser();
    this.getAuthenticatedUserWallet();
    this.todaysDate();

  }

  //get Todays Date
  todaysDate(){
    this.date = new Date();
    const latest_date = this.datepipe.transform(this.date, 'dd-MM-yyyy HH:mm');
    this.todayDate = latest_date;
  }

  getAuthenticatedUser(){
    this.authenticationService.getAuthenticatedUser().subscribe((result: any) => {
      this.authUserDetails = result;
    });
  }

  getAuthenticatedUserWallet(){
    this.authenticationService.getAuthenticatedUserWallet().subscribe((result: any) => {
      this.authUserWalletDetails = result;

      this.userWalletNumber = this.authUserWalletDetails.wallet_number;
      this.userCustomerId = this.authUserWalletDetails.customer_id;
      this.getLast10Transactions();
      this.getAllCards();
    });
  }

  getLast10Transactions(){
    this.authenticationService.last10Transaction(this.userWalletNumber).subscribe((result: any) => {
      this.last10TransactionList = result.transactionHistory;
    });
  }

  //get All Cards
  getAllCards(){
    this.authenticationService.getAllCard(this.userCustomerId).subscribe((result: any) => {
      this.allCardList = result.cardDetails;
      console.log('checning', this.allCardList);
    });
  }

  activateSlide(i){
    // alert(i);
    // if((i+1) === this.allCardList.length){

    // }

    if (i === 0){
    this.slideActive = 'swiper-slide swiper-slide-active';
    }else if(i === 1){
      this.slideActive = 'swiper-slide swiper-slide-next';
    } else {
      this.slideActive = 'swiper-slide';
    }
  }

}


