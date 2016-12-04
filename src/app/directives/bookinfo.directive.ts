/**
 * Created by strukov on 3.12.16.
 */
import {Component, OnInit, OnDestroy, Input} from "@angular/core";
import {BookService} from "../service/BookService";
import {Book} from "../model/Book";
import {Authentication} from "../utils/Authentication";
import {ModalBehaviour} from "./moda.directive";
import {Constants} from "../utils/Constants";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'bookinfo',
  templateUrl: './bookinfo.html',
  styleUrls: ['../app.component.css']
})
export class BookInfoModal extends ModalBehaviour implements OnInit{

  @Input()
  public selectedBook:Book;
  public isLoading:boolean= true;

  constructor(private bookService:BookService, public auth:Authentication, private route: ActivatedRoute){
    super();
  }

  ngOnInit(): void {
    $('.modal').modal({dismissible: false});
  }

  public addBook():void{
    this.bookService.saveBook(this.selectedBook).subscribe(()=>{
      console.log("Book saved");
    });
  }

  public onLoad():void{
    this.isLoading = false;
  }

  public openInfo(bookId:string):void{
    this.bookService.getBookById(bookId).subscribe(data=> {
      this.selectedBook = data;
      this.openModal(Constants.BookInfoModal);
    });
  }
  public closeInfo():void{
    this.closeModal(Constants.BookInfoModal);
    this.selectedBook = null;
    this.isLoading = true;
  }
}
