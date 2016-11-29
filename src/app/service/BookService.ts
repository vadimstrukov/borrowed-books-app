import {Injectable} from "@angular/core";
import {Http, URLSearchParams, RequestOptions, Headers} from "@angular/http";
import {Constants} from "../utils/Constants";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import {Book} from "../model/Book";
import {Authentication} from "../utils/Authentication";
/**
 * Created by strukov on 15.11.16.
 */

@Injectable()
export class BookService{
  public startIndex: any;
  constructor(private http:Http, private auth:Authentication){}

  getBooksByTitle(title:string){
    let params = new URLSearchParams();
    params.set('q', title);
    params.set('startIndex', this.startIndex);
    params.set('printType', 'books');
    params.set('filter', 'partial');
    params.set('key', Constants.API_KEY);
    return this.http.get(Constants.GoogleAPI, {search: params}).map(response => response.json());
  }

  getUserBooks(){
    return this.http.get(Constants.Books, {headers: this.auth.setAuthHeaders()})
      .map(response => response.json());
  }

  saveBook(book:Book){
    return this.http.post(Constants.Books, JSON.stringify(book), {headers: this.auth.setAuthHeaders()})
      .map(response => response.json());
  }

}
