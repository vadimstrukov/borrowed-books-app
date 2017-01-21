import {Component, ViewChild, OnInit} from "@angular/core";
import {BorrowedBook} from "../../model/BorrowedBook";
import {BookService, deleteBookFromMem} from "../../service/BookService";
import {Toast} from "../../utils/Toast";
import {BorrowBookModal} from "./borrowbook.directive";
import {Constants} from "../../utils/Constants";
import {BookInfoModal} from "./bookinfo.directive";
import {Book} from "../../model/Book";
/**
 * Created by strukov on 23.12.16.
 */
@Component({
  templateUrl: './borrowedbooks.html',
  styleUrls: ['../../app.component.scss']
})
export class BorrowedBooks implements OnInit{
  @ViewChild('borrowbook')
  public borrowBookModal: BorrowBookModal;
  @ViewChild('bookinfo')
  public bookInfoModal: BookInfoModal;
  public borrowedBooks: Array<BorrowedBook>;
  private returnDialogAgree:boolean;
  private _borrowedBook:BorrowedBook;

  constructor(private bookService: BookService) {
    this.bookService.getItems(Constants.BorrowedBooks).subscribe(
      data => this.borrowedBooks = data,
      e => Toast.getToast(e));
  }

  ngOnInit(): void {
    $('.modal').modal({
      starting_top: '4%',
      ending_top: '10%',
    });
  }

  public openReturnAgreeDialog(borrowedBook: BorrowedBook):void{
    $('#returnDialog').modal('open');
    this._borrowedBook = borrowedBook;
  }

  public closeReturnAgreeDialog():void{
    $('#returnDialog').modal('close');
    this._borrowedBook = null;
  }

  public actionCancel():void{
    this.returnDialogAgree= false;
    this.closeReturnAgreeDialog();
  }

  public actionAgree():void{
    this.returnDialogAgree = true;
    this.returnBook(this._borrowedBook);
  }



  private returnBook(borrowedBook: BorrowedBook): void {
      borrowedBook.ownedBook.borrowed = false;
      this.bookService.returnBook(borrowedBook).subscribe(
        () => {
          deleteBookFromMem(borrowedBook, this.borrowedBooks);
          this.bookService.getLibraryLength();
        },
        e => Toast.getToast(e),
        () => {Toast.getToast("Book successfully returned to your library!"); this.closeReturnAgreeDialog();});
  }

  public updateBorrowed(borrowedBook: BorrowedBook) {
    this.borrowBookModal.openBorrow(borrowedBook);
  }

  public openAdditionalInfo(book: Book): void {
    this.bookInfoModal.openInfo(book.id);
  }

}
