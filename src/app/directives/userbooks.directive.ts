/**
 * Created by strukov on 30.11.16.
 */
import {Component, OnInit} from "@angular/core";
import {BookService} from "../service/BookService";
import {OwnedBook} from "../model/OwnedBook";
import {element} from "protractor";

@Component({
  templateUrl: './userbooks.html',
  styleUrls: ['../app.component.scss']
})

export class UserBooks implements OnInit{
  public userBooks:Array<OwnedBook>;
  public parentId:string;
  private statusExpanded:boolean = false;

  constructor(private bookService:BookService){}

  ngOnInit():void{
    this.bookService.getUserBooks().subscribe(data=>this.userBooks = data);
  }

  private selectBook(event:any, expandable:boolean){
    if(!expandable)
      this.parentId = null;
    else
      this.parentId = event.target.parentNode.id;
    this.statusExpanded = expandable;
  };

  public expandEditPanel(event:any, userBook:OwnedBook){
    switch (this.parentId){
      case userBook.book.id:
        this.selectBook(null, false);
        console.log("Close expandable, Old Book");
        break;
      default:
        this.selectBook(event, true);
        console.log("Open expandable, New Book", this.parentId);
    }
  }
}
