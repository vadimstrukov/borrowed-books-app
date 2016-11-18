import {Injectable} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import {Constants} from "../utils/Constants";
import 'rxjs/Rx';
import {Observable} from "rxjs";
/**
 * Created by strukov on 15.11.16.
 */

@Injectable()
export class BookService{
  public startIndex: any;
  constructor(private http:Http){}

  getBooksByTitle(title:string){
    let params = new URLSearchParams();
    params.set('q', title);
    params.set('startIndex', this.startIndex);
    params.set('printType', 'books');
    params.set('filter', 'partial');
    params.set('key', Constants.API_KEY);
    return this.http.get(Constants.GoogleAPI, {search: params}).map(response => response.json());
  }

}
