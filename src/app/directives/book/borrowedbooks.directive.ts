import {Component, ViewChild} from "@angular/core";
import {BorrowedBook} from "../../model/BorrowedBook";
import {BookService} from "../../service/BookService";
import {Toast} from "../../utils/Toast";
import {BorrowBookModal} from "./borrowbook.directive";
/**
 * Created by strukov on 23.12.16.
 */
@Component({
  templateUrl: './borrowedbooks.html',
  styleUrls: ['../../app.component.scss']
})
export class BorrowedBooks{
  @ViewChild('borrowbook')
  public borrowBookModal: BorrowBookModal;

  constructor(private bookService:BookService){
    this.bookService.getBorrowedBooks();
  }

  public returnBook(borrowedBook:BorrowedBook):void{
    borrowedBook.ownedBook.borrowed = false;
    this.bookService.returnBook(borrowedBook);
    Toast.getToast("Book successfully returned to your library!");
  }

  public updateBorrowed(borrowedBook:BorrowedBook){
    this.borrowBookModal.openBorrow(borrowedBook, "UPDATE");
  }

}
