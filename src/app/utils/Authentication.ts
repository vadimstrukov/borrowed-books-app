/**
 * Created by strukov on 21.11.16.
 */
import {Injectable} from "@angular/core";
import {URLSearchParams, Headers, Http} from "@angular/http";
import {Constants} from "./Constants";

@Injectable()
export class Authentication{
  access_token: string;

  constructor(private http:Http) {
    this.access_token = localStorage.getItem('access_token');
  }

  authenticate(email:string, password:string){

    let credentials = new URLSearchParams();
    let headers = new Headers();
    let securedHeader = btoa('clientapp:123456');

    credentials.set('password', password);
    credentials.set('username', email);
    credentials.set('grant_type', 'password');
    credentials.set('client_secret', '123456');
    credentials.set('client_id', 'clientapp');

    headers.append('Authorization', 'Basic ' + securedHeader);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(Constants.OAuthURL, credentials.toString(),  {headers: headers})
      .map((res : any) => {
      this.access_token = res.json().access_token;
      localStorage.setItem('access_token', this.access_token);
    });
  }

  logout() {
    let params = new URLSearchParams();
    params.set('token', this.access_token);
    return this.http.get(Constants.LogoutURL, {search: params})
      .map((res : any) => {
        this.access_token = undefined;
        localStorage.removeItem('access_token');
      });
  }

}

export function isLoggedin() {
  return !!localStorage.getItem('access_token');
}
