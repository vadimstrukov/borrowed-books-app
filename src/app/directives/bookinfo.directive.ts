/**
 * Created by strukov on 3.12.16.
 */
import {Component, OnInit, Input} from "@angular/core";
import {BookService} from "../service/BookService";
import {Book} from "../model/Book";
import {Authentication} from "../utils/Authentication";
import {ModalBehaviour} from "./moda.directive";
import {Constants} from "../utils/Constants";
@Component({
  selector: 'bookinfo',
  templateUrl: './bookinfo.html',
  styleUrls: ['../app.component.css']
})
export class BookInfoModal extends ModalBehaviour implements OnInit{
  @Input()
  selectedBook:Book;

  constructor(private bookService:BookService, public auth:Authentication){
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  public addBook():void{
    this.bookService.saveBook(this.selectedBook).subscribe(()=>{
      console.log("Book saved");
    });
  }

  public openInfo():void{
    this.openModal(Constants.BookInfoModal);
  }
  public closeInfo():void{
    this.closeModal(Constants.BookInfoModal);
  }
}
