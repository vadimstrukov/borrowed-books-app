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

  public books: BookItems;
  public selectedBook:Book;
  public isInfoExpanded:boolean = false;
  private query:any;
  private subscription: Subscription;

  constructor(private bookService: BookService, private route: ActivatedRoute, public auth:Authentication){}

  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe((param:any)=>{
      this.query = param['q'];
      this.bookService.getBooksByTitle(this.query).subscribe(data => this.books = data);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  private selectBook(book:Book, expandable:boolean) :void{
    this.selectedBook = book;
    this.isInfoExpanded = expandable;
  }

  public bookClicked(book:Book, event:any) : void{
    //вызвается дважды, если вызывать здесь
    this.manipulationWithAdditionalData( '.remove()', 'u-height--245px_', 'limit u-height--75px', 'clicked_' );
    let clickedParent = $(event.target).parents('.col');
    switch (this.selectedBook){
      case book:
        this.selectBook(null, false);
        //не очищает данные, если сразу же перейти на другу книгу пока предыдущая открыта
        //this.manipulationWithAdditionalData( '.remove()', 'u-height--245px_', 'limit u-height--75px', 'clicked_' );
        break;
      default:
        this.selectBook(book, true);
        clickedParent.toggleClass('clicked_');
        this.manipulationWithAdditionalData( '', 'u-height--245px_', 'limit u-height--75px', '' );
    }
  }

  private manipulationWithAdditionalData( removeMethod:string, uHeight245px:string, uLimitAndHeight75:string, uClicked_:string ):void{
    $('.u-border--top_ + .u-information--about') + removeMethod;
    $('.clicked_ .u-width--145px, .clicked_ .card.horizontal').toggleClass(uHeight245px);
    $('.clicked_ .u-border--top_').toggleClass(uLimitAndHeight75).delay(1).queue(function () {
      $('.u-additional--information').insertAfter('.clicked_ .u-border--top_');
      $(this).dequeue();
    });
    $('.clicked_').toggleClass(uClicked_);
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
