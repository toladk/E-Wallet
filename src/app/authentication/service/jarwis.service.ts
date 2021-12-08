import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JarwisService {

  constructor(private http : HttpClient) { }

  signup(data) {
    return this.http.post(`${environment.baseUrl}${environment.v1}/wallets/register` , data);
  }

  login(data) {
    return this.http.post(`${environment.baseUrl}${environment.v1}/session/user-login` , data);
  }

}
