import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loggedIn = new BehaviorSubject<boolean>(this.Token.loggedIn());
  authStatus = this.loggedIn.asObservable();

  constructor(private Token: TokenService, private http: HttpClient) {

  }

  changeAuthStatus(value : boolean) {
    this.loggedIn.next(value);
  }

  passwordReset(payload){
    return this.http.post<any>(`${environment.baseUrl}${environment.v1}/password-reset`, payload);
  }

  changePassword(payload){
    return this.http.post<any>(`${environment.baseUrl}${environment.v1}/session/change-password`, payload, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  twoFactor(payload){
    return this.http.post<any>(`${environment.baseUrl}${environment.v1}/session/two-factor`, payload, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  getAuthenticatedUser(){
    return this.http.get(`${environment.baseUrl}${environment.v1}/session/authenticated-user`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  getAuthenticatedUserWallet(){
    return this.http.get(`${environment.baseUrl}${environment.v1}/session/authenticated-user-wallet`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  last10Transaction(walletNumber){
    return this.http.get(`${environment.baseUrl}${environment.v1}/wallets/miniStatementInquiry?walletNumber=${walletNumber}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  getMerchants(){
    return this.http.get(`${environment.baseUrl}${environment.v1}/merchants/all-merchants`);
  }

  validateBvn(bvn){
    return this.http.get(`${environment.baseUrl}${environment.v1}/validate-bvn/${bvn}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  getAllCard(card){
    return this.http.get(`${environment.baseUrl}${environment.v1}/wallets/cards/get-customer-cards/${card}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

}
