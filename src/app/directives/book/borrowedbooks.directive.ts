import {Component} from "@angular/core";
import {BorrowedBook} from "../../model/BorrowedBook";
import {BookService} from "../../service/BookService";
/**
 * Created by strukov on 23.12.16.
 */
@Component({
  templateUrl: './borrowedbooks.html',
  styleUrls: ['../../app.component.scss']
})
export class BorrowedBooks{

  constructor(private bookService:BookService){
    this.bookService.getBorrowedBooks();
  }
}
