/**
 * Created by strukov on 21.11.16.
 */
import {Injectable} from "@angular/core";
import {URLSearchParams, Headers, Http} from "@angular/http";
import {Constants} from "../utils/Constants";
import {User} from "../model/User";
import {Observable, Subscription} from "rxjs";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";

@Injectable()
export class Authentication {

  private _accessToken: string;
  private _authUser: User;


  get accessToken(): string {
    return this._accessToken;
  }

  set accessToken(value: string) {
    this._accessToken = value;
  }

  get authUser(): User {
    return this._authUser;
  }

  set authUser(value: User) {
    this._authUser = value;
  }

  constructor(private http: Http) {
    this.accessToken = localStorage.getItem('access_token');
    this.getAuthUser();
  }

  public setAuthHeaders(): Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.accessToken);
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
        this.accessToken = response.json().access_token;
        localStorage.setItem('access_token', this.accessToken);
      }).catch(handleError);
  }

  public logout(): Observable<void> {
    let headers = new Headers();
    headers.set('Authorization', 'Bearer ' + this.accessToken);
    return this.http.get(Constants.LogoutURL, {headers: headers}).map(() => {
      this.accessToken= undefined;
      localStorage.removeItem('access_token');
      this.authUser = null;
    });
  }

  public getAuthUser(): Subscription {
    if (this.accessToken)
      return this.http.get(Constants.LoggedInUser, {headers: this.setAuthHeaders()})
        .map(response => response.json())
        .subscribe(data => this.authUser = data);
  }

  public isLoggedIn(): boolean {
    return this.accessToken !== null && this.accessToken !== undefined;
  }

}

function handleError(error: any) {
  let errorMsg = error.message || 'There was a problem, check your credentials!';
  console.error(errorMsg);
  return Observable.throw(errorMsg);
}
