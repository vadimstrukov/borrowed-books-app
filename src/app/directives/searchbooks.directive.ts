/**
 * Created by strukov on 30.11.16.
 */
import {Component, OnInit, OnDestroy, ViewChild} from "@angular/core";
import {BookService} from "../service/BookService";
import {BookItems} from "../model/BookItems";
import {Book} from "../model/Book";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {User} from "../model/User";
import {Authentication} from "../utils/Authentication";
import {BookInfoModal} from "./bookinfo.directive";
import {Constants} from "../utils/Constants";
@Component({
  templateUrl: './searchbook.html',
  styleUrls: ['../app.component.css']
})
export class SearchBooks implements OnInit, OnDestroy{

  public books: BookItems;
  private query:any;
  private subscription: Subscription;
  public selectedBook:Book;

  constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router, public auth:Authentication){}

  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe((param:any)=>{
      this.query = param['q'];
      if(this.query!=null)
        this.bookService.getBooksByTitle(this.query).subscribe(data => this.books = data);
      else{
        this.books = null;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  public openAdditionalInfo(book:Book) : void{
    this.selectedBook = book;
    this.router.navigate(['/book'], {queryParams : {id: book.id}});

  }
   public onScroll():void{
    this.bookService.startIndex += 10;
    this.bookService.getBooksByTitle(this.query).subscribe(data => {
      for(let book of data.items)
        this.books.items.push(book);
    });
  }

}