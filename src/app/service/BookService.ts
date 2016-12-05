import {Injectable} from "@angular/core";
import {Http, URLSearchParams, Response} from "@angular/http";
import {Constants} from "../utils/Constants";
import 'rxjs/Rx';
import {Book} from "../model/Book";
import {Authentication} from "../utils/Authentication";
import {OwnedBook} from "../model/OwnedBook";
import {Observable} from "rxjs";
import {BookItems} from "../model/BookItems";
/**
 * Created by strukov on 15.11.16.
 */

@Injectable()
export class BookService{
  public startIndex: any;
  constructor(private http:Http, private auth:Authentication){}

  public getBooksByTitle(title:string):Observable<BookItems>{
    let params = new URLSearchParams();
    params.set('q', title);
    params.set('startIndex', this.startIndex);
    params.set('printType', 'books');
    params.set('filter', 'partial');
    params.set('projection', 'lite');
    params.set('key', Constants.API_KEY);
    return this.http.get(Constants.GoogleAPI, {search: params}).map(response => response.json());
  }

  public getBookAndCheckStatus(id:string):Observable<any>{
    let params = new URLSearchParams();
    params.set("id", id);
    return Observable.forkJoin(
      this.http.get(Constants.GoogleAPI + '/' + id)
        .map(response => response.json()),
      this.http.get(Constants.CheckOwnedBook, {search: params, headers: this.auth.setAuthHeaders()})
        .map(response=>response.json())
    );
  }

  public getUserBooks():Observable<Array<OwnedBook>>{
    return this.http.get(Constants.Books, {headers: this.auth.setAuthHeaders()})
      .map(response => response.json());
  }

  public deleteUserBook(userBook:OwnedBook):Observable<OwnedBook>{
    return this.http.delete(Constants.Books, {headers: this.auth.setAuthHeaders(), body: JSON.stringify(userBook)})
      .map(response=>response.json());
  }

  public saveBook(book:Book):Observable<Book>{
    return this.http.post(Constants.Books, JSON.stringify(book), {headers: this.auth.setAuthHeaders()})
      .map(response => response.json());
  }

}
