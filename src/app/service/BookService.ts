import {Injectable} from "@angular/core";
import {Http, URLSearchParams, Response} from "@angular/http";
import {Constants} from "../utils/Constants";
import "rxjs/Rx";
import {Book} from "../model/Book";
import {Authentication} from "./AuthService";
import {Observable, Subscription} from "rxjs";
import {BookItems} from "../model/BookItems";
import {BorrowedBook} from "../model/BorrowedBook";
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import {UserLibrary} from "../model/UserLibrary";
/**
 * Created by strukov on 15.11.16.
 */

@Injectable()
export class BookService {
  public startIndex: any;
  public userLibrary:UserLibrary;

  constructor(private http: Http, private auth: Authentication) {}


  public getLibraryLength():Subscription{
    return this.http.get(Constants.LibraryLength, {headers: this.auth.setAuthHeaders()})
      .map(response=>response.json())
      .subscribe(data => this.userLibrary = data);
  }

  public getBooksByTitle(title: string): Observable<BookItems> {
    let params = new URLSearchParams();
    params.set('q', title);
    params.set('startIndex', this.startIndex);
    params.set('printType', 'books');
    params.set('filter', 'partial');
    params.set('projection', 'lite');
    params.set('key', Constants.API_KEY);
    return this.http.get(Constants.GoogleAPI, {search: params}).map(response => response.json());
  }

  public getBookWithCheck(id: string): Observable<any> {
    return Observable.forkJoin(
      this.getItem(id, Constants.GoogleAPI),
      this.http.get(Constants.CheckOwnedBook, {search: setIdURLParam(id), headers: this.auth.setAuthHeaders()})
        .map(response => response.json())
    ).catch(handleError);
  }

  public getBookWithoutCheck(id: string): Observable<Book> {
    return this.getItem(id, Constants.GoogleAPI);
  }

  public borrowBook(borrowedBook: BorrowedBook): Observable<any> {
    return Observable.forkJoin(
      this.saveItem(borrowedBook, Constants.BorrowedBooks),
      this.updateItem(borrowedBook.ownedBook, Constants.OwnedBooks),
    );
  }

  public returnBook(borrowedBook: BorrowedBook) {
    return Observable.forkJoin(
      this.updateItem(borrowedBook.ownedBook, Constants.OwnedBooks),
      this.deleteItem(borrowedBook.id, Constants.BorrowedBooks)
    );
  }

  public saveItem<T>(item: T, url: string): Observable<Response> {
    return this.http.post(url, JSON.stringify(item), {headers: this.auth.setAuthHeaders()})
      .catch(handleError);
  }

  public deleteItem<T>(id: any, url: string): Observable<T> {
    return this.http.delete(url, {search: setIdURLParam(id), headers: this.auth.setAuthHeaders()})
      .catch(handleError);
  }

  public getItems<T>(url: string) {
    return this.http.get(url, {headers: this.auth.setAuthHeaders()})
      .map(response => response.json())
      .catch(handleError);
  }

  public getItem<T>(id: any, url: string): Observable<any> {
    return this.http.get(url + '/' + id)
      .map(response => response.json()).catch(handleError);
  }

  public updateItem<T>(item: T, url: string): Observable<T> {
    return this.http.put(url, JSON.stringify(item), {headers: this.auth.setAuthHeaders()})
      .catch(handleError);
  }
}

function handleError(error: any) {
  let errorMsg = error.message || 'There was a problem with our API, try again...';
  console.error(errorMsg);
  return Observable.throw(errorMsg);
}

function setIdURLParam(id: any): URLSearchParams {
  let params = new URLSearchParams();
  params.set("id", id.toString());
  return params;
}

export function deleteBookFromMem<T>(book: T, array: Array<T>): void {
  array.splice(array.indexOf(book), 1);
}
