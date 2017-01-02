/**
 * Created by strukov on 21.11.16.
 */
import {Injectable} from "@angular/core";
import {URLSearchParams, Headers, Http} from "@angular/http";
import {Constants} from "./Constants";
import {User} from "../model/User";
import {Observable, Subscription} from "rxjs";

@Injectable()
export class Authentication {

  public access_token: string;
  public user: User;

  constructor(private http: Http) {
    this.access_token = localStorage.getItem('access_token');
    this.getAuthUser();
  }

  public setAuthHeaders(): Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.access_token);
    return headers;
  }

  public authenticate(email: string, password: string): Observable<void> {

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

    return this.http.post(Constants.OAuthURL, credentials.toString(), {headers: headers})
      .map((response) => {
        this.access_token = response.json().access_token;
        localStorage.setItem('access_token', this.access_token);
      });
  }

  public logout(): Observable<void> {
    let headers = new Headers();
    headers.set('Authorization', 'Bearer ' + this.access_token);
    return this.http.get(Constants.LogoutURL, {headers: headers}).map(() => {
      this.access_token = undefined;
      localStorage.removeItem('access_token');
      this.user = null;
    });
  }

  public getAuthUser(): Subscription {
    if (this.access_token)
      return this.http.get(Constants.LoggedInUser, {headers: this.setAuthHeaders()})
        .map(response => response.json())
        .subscribe(data => this.user = data);
  }

  public isLoggedIn(): boolean {
    return this.access_token !== null && this.access_token !== undefined;
  }

}
