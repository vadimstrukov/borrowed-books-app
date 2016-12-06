/**
 * Created by strukov on 3.12.16.
 */
import {Component, OnInit, OnDestroy, Input} from "@angular/core";
import {BookService} from "../service/BookService";
import {Book} from "../model/Book";
import {Authentication} from "../utils/Authentication";
import {ModalBehaviour} from "./moda.directive";
import {Constants} from "../utils/Constants";
import {ActivatedRoute} from "@angular/router";
import {OwnedBook} from "../model/OwnedBook";
import {forEach} from "@angular/router/src/utils/collection";
import {error} from "util";

@Component({
  selector: 'bookinfo',
  templateUrl: './bookinfo.html',
  styleUrls: ['../app.component.css']
})
export class BookInfoModal extends ModalBehaviour implements OnInit{

  public selectedBook:Book;
  private ownedBook:OwnedBook;
  public isLoading:boolean= true;
  public isInLibrary:boolean = false;

  constructor(private bookService:BookService, public auth:Authentication, private route: ActivatedRoute){
    super();
  }

  ngOnInit(): void {
    $('.modal').modal({dismissible: false});
  }

  public addBook():void{
    this.bookService.saveBook(this.ownedBook =
      {
        readStatus: "UNREAD",
        book: this.selectedBook,
        user: this.auth.user,
        date_added: new Date()})
      .subscribe(()=>{
      this.setIsInLibrary(true);
    });
  }

  private setIsInLibrary(isInLibrary:boolean){
    this.isInLibrary = isInLibrary;
  }

  public onLoad():void{
    this.isLoading = false;
  }

  public openInfo(bookId:string):void{
    if(this.auth.isLoggedIn())
      this.bookService.getBookAndCheckStatus(bookId).subscribe(data=>{
        if(data[1].status=="EXISTS")
          this.setIsInLibrary(true);
        else
          this.setIsInLibrary(false);
        this.selectedBook = data[0];
      });
    else
      this.bookService.getBookWithoutCheck(bookId).subscribe(data =>{
        this.selectedBook = data;
      });
    this.openModal(Constants.BookInfoModal);
  }

  public closeInfo():void{
    this.closeModal(Constants.BookInfoModal);
    this.selectedBook = null;
    this.isLoading = true;
  }
}
