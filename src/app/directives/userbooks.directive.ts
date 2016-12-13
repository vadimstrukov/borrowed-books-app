/**
 * Created by strukov on 30.11.16.
 */
import {Component, OnInit} from "@angular/core";
import {BookService} from "../service/BookService";
import {OwnedBook} from "../model/OwnedBook";

@Component({
  templateUrl: './userbooks.html',
  styleUrls: ['../app.component.scss']
})

export class UserBooks implements OnInit{
  userBooks:Array<OwnedBook>;
  selectedUserBook:OwnedBook;
  statusExpanded:boolean = false;

  constructor(private bookService:BookService){}

  ngOnInit():void{
    this.bookService.getUserBooks().subscribe(data=>this.userBooks = data);
  }

  private selectBook(book:OwnedBook, expandable:boolean){
    this.selectedUserBook = book;
    this.statusExpanded = expandable;
  };

  public bookClicked(book:OwnedBook){
    switch (this.selectedUserBook){
      case book:
        this.selectBook(null, false);
        console.log("Close expandable, Old Book", this.selectedUserBook);
        break;
      default:
        this.selectBook(book, true);
        console.log("Open expandable, New Book", this.selectedUserBook);
    }
  }
}
