/**
 * Created by strukov on 30.11.16.
 */
import {Component, OnInit, OnDestroy} from "@angular/core";
import {BookService} from "../service/BookService";
import {BookItems} from "../model/BookItems";
import {Book} from "../model/Book";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {User} from "../model/User";
import {Authentication} from "../utils/Authentication";
@Component({
  templateUrl: './searchbook.html',
  styleUrls: ['../app.component.css']
})
export class SearchBooks implements OnInit, OnDestroy{

  books: BookItems;
  selectedBook:Book;
  isInfoExpanded:boolean = false;
  query:any;
  private subscription: Subscription;

  constructor(private bookService: BookService, private route: ActivatedRoute, public auth:Authentication){}

  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe((param:any)=>{
      this.query = param['q'];
      if(this.query.length>0)
        this.bookService.getBooksByTitle(this.query).subscribe(data => this.books = data);
      else
        this.books = null;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  private selectBook(book:Book, expandable:boolean) :void{
    this.selectedBook = book;
    this.isInfoExpanded = expandable;
  }

  public bookClicked(book:Book, event:any){
    switch (this.selectedBook){
      case book:
        this.selectBook(null, false);
        this.clearInformationBlock();
        break;
      default:
        this.selectBook(book, true);
        var clickedParent = $(event.target).parents('.col');
        this.clearInformationBlock();
        clickedParent.toggleClass('clicked_');
        $('.clicked_ .u-height--245px_').toggleClass('u-height--245px_ u-was--245px');
        $('.clicked_ .u-width--145px').toggleClass('u-height--245px_');
        $('.clicked_ .u-border--top_').toggleClass('limit u-height--75px').delay(1).queue(function () {
          $('.u-additional--information').insertAfter('.clicked_ .u-border--top_');
          $(this).dequeue();
        });
    }
  }

  private clearInformationBlock():void{
    $('.u-border--top_ + .u-information--about').remove();
    $('.u-was--245px').toggleClass('u-was--245px u-height--245px_');
    $('.clicked_ .u-width--145px').removeClass('u-height--245px_');
    $('.clicked_ .u-border--top_').toggleClass('limit u-height--75px');
    $('.clicked_').toggleClass('clicked_');
  }


   public onScroll():void{
    this.bookService.startIndex += 10;
    this.bookService.getBooksByTitle(this.query).subscribe(data => {
      for(let book of data.items)
        this.books.items.push(book);
    });
  }

  public addBook():void{
    this.bookService.saveBook(this.selectedBook).subscribe(()=>{
      console.log("Book saved");
    });
  }

}
