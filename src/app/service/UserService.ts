/**
 * Created by strukov on 21.11.16.
 */
import {Injectable} from "@angular/core";
import {Http, Headers, URLSearchParams} from "@angular/http";
import {Constants} from "../utils/Constants";
@Injectable()
export class UserService{

  constructor(private http:Http){}

  getLoggedInUser(){
    let headers = new Headers();
    headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    return this.http.get(Constants.LoggedInUser, {headers: headers}).map(response => response.json());
  }

}
