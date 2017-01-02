import {Component, ViewChild} from "@angular/core";
import {BorrowedBook} from "../../model/BorrowedBook";
import {BookService, deleteBookFromMem} from "../../service/BookService";
import {Toast} from "../../utils/Toast";
import {BorrowBookModal} from "./borrowbook.directive";
import {Constants} from "../../utils/Constants";
/**
 * Created by strukov on 23.12.16.
 */
@Component({
  templateUrl: './borrowedbooks.html',
  styleUrls: ['../../app.component.scss']
})
export class BorrowedBooks {
  @ViewChild('borrowbook')
  public borrowBookModal: BorrowBookModal;
  public borrowedBooks: Array<BorrowedBook>;

  constructor(private bookService: BookService) {
    this.bookService.getItems(Constants.BorrowedBooks).subscribe(
      data => this.borrowedBooks = data,
      e => Toast.getToast(e));
  }

  public returnBook(borrowedBook: BorrowedBook): void {
    borrowedBook.ownedBook.borrowed = false;
    this.bookService.returnBook(borrowedBook).subscribe(
      () => deleteBookFromMem(borrowedBook, this.borrowedBooks),
      e => Toast.getToast(e));
  }

  public updateBorrowed(borrowedBook: BorrowedBook) {
    this.borrowBookModal.openBorrow(borrowedBook);
  }

}
