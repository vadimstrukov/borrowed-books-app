/**
 * Created by strukov on 22.11.16.
 */
import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers} from "@angular/http";
import {User} from "../model/User";
import {Constants} from "../utils/Constants";
import {Observable} from "rxjs";
import "rxjs/Rx";
@Injectable()
export class UserService {

  constructor(private http: Http) {
  }

  register(user: User) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(Constants.Register, JSON.stringify(user), options)
      .map(response=>response.json())
      .catch(handleError);
  }
}

function handleError(error: any) {
  let errorMsg = error.message || 'There was a problem, check your credentials!';
  console.error(errorMsg);
  return Observable.throw(errorMsg);
}
