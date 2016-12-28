/**
 * Created by strukov on 23.12.16.
 */
import {Component, OnInit} from "@angular/core";
import {ModalBehaviour} from "../modal.directive";
import {Constants} from "../../utils/Constants";
import {BookService} from "../../service/BookService";
import {OwnedBook} from "../../model/OwnedBook";
import {BorrowedBook} from "../../model/BorrowedBook";
import {Toast} from "../../utils/Toast";
import {Book} from "../../model/Book";
@Component({
  selector: 'borrowbook',
  templateUrl: './borrowbook.html',
  styleUrls: ['../../app.component.scss']
})
export class BorrowBookModal extends ModalBehaviour implements OnInit{
  selectedBook:BorrowedBook|OwnedBook;
  bookToBorrow:Book;
  borrowedBook:BorrowedBook;

  constructor(private bookService:BookService){
    super();
  }

  ngOnInit():void{
    super.ngOnInit();
    this.initModalName(Constants.BorrowBookModal);
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15,
      format: 'yyyy-mm-dd'
    });
  }

  public openBorrow(bookToBorrow: OwnedBook | BorrowedBook):void{
    if(isBorrowed(bookToBorrow))
      this.bookToBorrow = bookToBorrow.ownedBook.book;
    else
      this.bookToBorrow = bookToBorrow.book;
    this.selectedBook = bookToBorrow;
    this.openModal();
  }

  public borrowBook(description:string, return_date:Date):void{
    if(!isBorrowed(this.selectedBook)) {
      this.selectedBook.borrowed = true;
      this.bookService.borrowBook(
        this.borrowedBook = {
          ownedBook: this.selectedBook,
          borrowDate: new Date(),
          returnDate: return_date,
          borrowDescription: description
        }).subscribe(() => {
        this.bookService.deleteBookFromMem(this.selectedBook, this.bookService.userBooks);
        console.log("Book borrowed successfully!");
        this.closeBorrow();
      });
      Toast.getToast("Book borrowed successfully!");
    }
    else {
      this.selectedBook.borrowDescription = description;
      this.selectedBook.returnDate = return_date;
      this.bookService.updateItem(this.selectedBook, Constants.BorrowedBooks).subscribe(
        ()=> this.closeBorrow(),
        e => Toast.getToast(e),
        ()=> Toast.getToast("Borrowed book updated successfully!"));
    }
  }

  public closeBorrow():void{
    this.closeModal();
  }

}

function isBorrowed(book: BorrowedBook | OwnedBook): book is BorrowedBook {
  return (<BorrowedBook>book).ownedBook !== undefined;
}

