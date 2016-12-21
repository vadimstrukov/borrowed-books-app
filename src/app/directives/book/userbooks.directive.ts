/**
 * Created by strukov on 30.11.16.
 */
import {Component, OnInit, ViewChild} from "@angular/core";
import {BookService} from "../../service/BookService";
import {OwnedBook} from "../../model/OwnedBook";
import {element} from "protractor";
import {Book} from "../../model/Book";
import {BookInfoModal} from "./bookinfo.directive";

@Component({
  templateUrl: 'userbooks.html',
  styleUrls: ['../../app.component.scss']
})

export class UserBooks implements OnInit{
  public userBooks:Array<OwnedBook>;
  public parentId:string;
  private statusExpanded:boolean = false;
  @ViewChild('bookinfo')
  public bookInfoModal:BookInfoModal;

  constructor(private bookService:BookService){}

  ngOnInit():void{
    this.bookService.getUserBooks().subscribe(data=>this.userBooks = data);
  }

  public deleteUserBook(userBook:OwnedBook):void{
    this.bookService.deleteUserBook(userBook.id).subscribe(()=>{
      this.userBooks.splice(this.userBooks.indexOf(userBook), 1);
    });
  }

  public openAdditionalInfo(book:Book) : void{
    this.bookInfoModal.openInfo(book.id);
  }

  public expandEditPanel(event:any, userBook:OwnedBook){
    switch (this.parentId){
      case userBook.book.id:
        this.statusExpanded = false;
        this.parentId = null;
        console.log("Close expandable, Old Book");
        break;
      default:
        this.statusExpanded = true;
        this.parentId = event.target.parentNode.id;
        console.log("Open expandable, New Book", this.parentId);
    }
  }
}
