/**
 * Created by strukov on 3.12.16.
 */
import {Component, OnInit, OnDestroy, Input} from "@angular/core";
import {BookService} from "../../service/BookService";
import {Book} from "../../model/Book";
import {Authentication} from "../../utils/Authentication";
import {ModalBehaviour} from "../modal.directive";
import {Constants} from "../../utils/Constants";
import {ActivatedRoute} from "@angular/router";
import {OwnedBook} from "../../model/OwnedBook";
import {Toast} from "../../utils/Toast";

@Component({
  selector: 'bookinfo',
  templateUrl: 'bookinfo.html',
  styleUrls: ['../../app.component.scss']
})
export class BookInfoModal extends ModalBehaviour implements OnInit{

  public selectedBook:Book;
  private ownedBook:OwnedBook;
  public isInLibrary:boolean = false;

  constructor(private bookService:BookService, public auth:Authentication, private route: ActivatedRoute){
    super();
  }


  ngOnInit(): void {
    super.ngOnInit();
    this.initModalName(Constants.BookInfoModal);
  }

  public addBook():void{
    this.bookService.saveBook(this.ownedBook =
      {
        readStatus: "UNREAD",
        book: this.selectedBook,
        borrowed: false,
        date_added: new Date()})
      .subscribe(()=>{
      this.setIsInLibrary(true);
    });
    Toast.getToast("Book added to your library successfully!");
  }

  private setIsInLibrary(isInLibrary:boolean){
    this.isInLibrary = isInLibrary;
  }


  public openInfo(bookId:string):void{
    if(this.auth.isLoggedIn())
      this.bookService.getBookWithCheck(bookId).subscribe(data=>{
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
    this.openModal();
  }

  public closeInfo():void{
    this.closeModal();
    this.selectedBook = null;
  }
}
