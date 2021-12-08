import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private http: HttpClient
  ) { }

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


  walletTransfer(payload){
    return this.http.post<any>(`${environment.baseUrl}${environment.v1}/wallets/fundsTransfer`, payload, {headers : {
      Authorization : `Bearer ${localStorage.token}`
    }});
  }

  getWalletBeneficiary(){
    return this.http.get(`${environment.baseUrl}${environment.v1}/wallets/get-all-beneficiaries/Wallet`, {headers : {
      Authorization : `Bearer ${localStorage.token}`
    }});
  }

  addBeneficiary(payload){
    return this.http.post<any>(`${environment.baseUrl}${environment.v1}/wallets/save-beneficiary`, payload, {headers : {
      Authorization : `Bearer ${localStorage.token}`
    }});
  }

  getBankBeneficiary(){
    return this.http.get(`${environment.baseUrl}${environment.v1}/wallets/get-all-beneficiaries/Bank`, {headers : {
      Authorization : `Bearer ${localStorage.token}`
    }});
  }

  getBeneficiaryById(id){
    return this.http.get(`${environment.baseUrl}${environment.v1}/wallets/get-beneficiary-byId/${id}`, {headers : {
      Authorization : `Bearer ${localStorage.token}`
    }});
  }

  changeTransPasswordOtp(){
    return this.http.get(`${environment.baseUrl}${environment.v1}/wallets/send-otp`, {headers : {
      Authorization : `Bearer ${localStorage.token}`
    }});
  }

  postTransactionPassword(payload){
    return this.http.post<any>(`${environment.baseUrl}${environment.v1}/utilities/set-transaction-password`, payload, {headers : {
      Authorization : `Bearer ${localStorage.token}`
    }});
  }

  verifyTransactionPassword(payload){
    return this.http.post<any>(`${environment.baseUrl}${environment.v1}/utilities/validate-transaction-password`, payload, {headers : {
      Authorization : `Bearer ${localStorage.token}`
    }});
  }

  addCard(payload){
    return this.http.post<any>(`${environment.baseUrl}${environment.v1}/wallets/cards/add-card`, payload, {headers : {
      Authorization : `Bearer ${localStorage.token}`
    }});
  }

  validateAccountNo(payload){
    return this.http.post<any>(`${environment.baseUrl}${environment.v1}/wallets/cards/add-card`, payload, {headers : {
      Authorization : `Bearer ${localStorage.token}`
    }});
  }

  validateWallet(walletName){
    return this.http.get(`${environment.baseUrl}${environment.v1}/wallets/nameInquiry?walletNumber=${walletName}`, {headers : {
      Authorization : `Bearer ${localStorage.token}`
    }});
  }

  validateAccountNoBene(accountNo, bankCode){
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${environment.baseUrl}${environment.v1}/transactions/name-inquiry?accountNumber=${accountNo}&bankCode=${bankCode}`, {headers : {
      Authorization : `Bearer ${localStorage.token}`
    }});
  }

  addCardOtp(payload){
    return this.http.post<any>(`${environment.baseUrl}${environment.v1}/wallets/cards/authorize-add-card`, payload, {headers : {
      Authorization : `Bearer ${localStorage.token}`
    }});
  }

  getBanks(){
    return this.http.get(`${environment.baseUrl}${environment.v1}/transactions/bank-list`, {headers : {
      Authorization : `Bearer ${localStorage.token}`
    }});
  }

  getAllCard(card){
    return this.http.get(`${environment.baseUrl}${environment.v1}/wallets/cards/get-customer-cards/${card}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  getCardById(cardId){
    return this.http.get(`${environment.baseUrl}${environment.v1}/wallets/cards/get-customer-card-details/${cardId}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  fundWalletWithCard(payload){
    return this.http.post<any>(`${environment.baseUrl}${environment.v1}/wallets/fundWalletWithCard`, payload, {headers : {
      Authorization : `Bearer ${localStorage.token}`
    }});
  }

  fundWalletWithCardOneOff(payload){
    return this.http.post<any>(`${environment.baseUrl}${environment.v1}/wallets/fundWalletWithCard/oneOff`, payload, {headers : {
      Authorization : `Bearer ${localStorage.token}`
    }});
  }

  fundWalletWithCardOneOffToken(payload){
    return this.http.post<any>(`${environment.baseUrl}${environment.v1}/wallets/fundWalletWithCard/oneOff/authorize`, payload, {headers : {
      Authorization : `Bearer ${localStorage.token}`
    }});
  }

  fundWithdrawal(payload){
    return this.http.post<any>(`${environment.baseUrl}${environment.v1}/wallets/withdrawal`, payload, {headers : {
      Authorization : `Bearer ${localStorage.token}`
    }});
  }

  buyAirtime(payload){
    return this.http.post<any>(`${environment.baseUrl}${environment.v1}/wallets/airtime-top-up`, payload, {headers : {
      Authorization : `Bearer ${localStorage.token}`
    }});
  }

  getBeneficiaryTypes(){
    return this.http.get(`${environment.baseUrl}${environment.v1}/wallets/beneficiary-types`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  deleteBeneficiary(beneficairyId){
    const payload = { beneficairyId };
    return this.http.post<any>(`${environment.baseUrl}${environment.v1}/wallets/delete-beneficiary`, payload, {headers : {
      Authorization : `Bearer ${localStorage.token}`
    }});
  }

  getBillerCategory(){
    return this.http.get(`${environment.baseUrlTrans}${environment.v1}/ewallet-transactions/GetBillerCategories/QuickTeller`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  getBillerCategoryById(id){
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${environment.baseUrlTrans}${environment.v1}/ewallet-transactions/GetBillersByCategory/QuickTeller?categoryId=${id}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  getBillerPaymentById(id){
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${environment.baseUrlTrans}${environment.v1}/ewallet-transactions/GetBillersPaymentItems/QuickTeller?billerId=${id}`, {headers: {
      Authorization: `Bearer ${localStorage.token}`
    }});
  }

  validateCustomer(customerId, paymentCode){
    const payload = {customerId, paymentCode};
    // tslint:disable-next-line:max-line-length
    return this.http.post<any>(`${environment.baseUrlTrans}${environment.v1}/ewallet-transactions/ValidateCustomer/QuickTeller`, payload, {headers : {
      Authorization : `Bearer ${localStorage.token}`
    }});
  }

addBillPayment(payload){
  return this.http.post<any>(`${environment.baseUrl}${environment.v1}/wallets/bills-payment`, payload, {headers : {
    Authorization : `Bearer ${localStorage.token}`
  }});
}



}
