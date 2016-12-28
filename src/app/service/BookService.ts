import {Injectable} from "@angular/core";
import {Http, URLSearchParams, Response} from "@angular/http";
import {Constants} from "../utils/Constants";
import 'rxjs/Rx';
import {Book} from "../model/Book";
import {Authentication} from "../utils/Authentication";
import {OwnedBook} from "../model/OwnedBook";
import {Observable, Subscription} from "rxjs";
import {BookItems} from "../model/BookItems";
import {BorrowedBook} from "../model/BorrowedBook";
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

  public getBookWithCheck(id:string):Observable<any>{
    let params = new URLSearchParams();
    params.set("id", id);
    return Observable.forkJoin(
      this.http.get(Constants.GoogleAPI + '/' + id)
        .map(response => response.json()),
      this.http.get(Constants.CheckOwnedBook, {search: params, headers: this.auth.setAuthHeaders()})
        .map(response=>response.json())
    );
  }

  public getBookWithoutCheck(id:string):Observable<Book>{
    return this.http.get(Constants.GoogleAPI + '/' + id).map(response=>response.json());
  }


  public deleteUserBook(userBook:OwnedBook):Subscription{
    let params = new URLSearchParams();
    params.set("id", userBook.id.toString());
    return this.http.delete(Constants.OwnedBooks, {search: params, headers: this.auth.setAuthHeaders()})
      .subscribe(()=>{
      this.deleteBookFromMem(userBook, this.userBooks);
    });
  }

  public deleteBookFromMem<T>(book:T, array:Array<T>):void{
    array.splice(array.indexOf(book), 1);
  }

  public saveBook(ownedBook:OwnedBook):Observable<OwnedBook>{
    return this.http.post(Constants.OwnedBooks, JSON.stringify(ownedBook), {headers: this.auth.setAuthHeaders()})
      .map(response => response.json());
  }

  public borrowBook(borrowedBook:BorrowedBook):Observable<any>{
    return Observable.forkJoin(
      this.http.post(Constants.BorrowedBooks, JSON.stringify(borrowedBook), {headers: this.auth.setAuthHeaders()})
        .map(response => response.json()),
      this.http.put(Constants.OwnedBooks, JSON.stringify(borrowedBook.ownedBook), {headers: this.auth.setAuthHeaders()})
        .map(response => response.json()));
  }

  public returnBook(borrowedBook:BorrowedBook):Subscription{
    let params = new URLSearchParams();
    params.set("id", borrowedBook.id.toString());
    return Observable.forkJoin(
      this.http.delete(Constants.BorrowedBooks, {search: params, headers: this.auth.setAuthHeaders()}),
      this.http.put(Constants.OwnedBooks, JSON.stringify(borrowedBook.ownedBook), {headers: this.auth.setAuthHeaders()})
    ).subscribe(()=>{
      this.deleteBookFromMem(borrowedBook, this.borrowedBooks);
    });
  }

  public getList<T>(url:string):Observable<any>{
    return this.http.get(url, {headers: this.auth.setAuthHeaders()})
      .map(response=>response.json())
      .catch(handleError);
  }

  public update<T>(book:T, url:string): Observable<T>{
    return this.http.put(url, JSON.stringify(book), {headers: this.auth.setAuthHeaders()})
      .catch(handleError);
  }

}
function handleError (error: any) {
  let errorMsg = error.message || 'There was a problem with our API, try again...';
  console.error(errorMsg);
  return Observable.throw(errorMsg);
}
