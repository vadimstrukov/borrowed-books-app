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
@Component({
  selector: 'borrowbook',
  templateUrl: './borrowbook.html',
  styleUrls: ['../../app.component.scss']
})
export class BorrowBookModal extends ModalBehaviour implements OnInit{
  selectedUserBook:OwnedBook;
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

  public openBorrow(userBook:OwnedBook):void{
    this.selectedUserBook = userBook;
    this.openModal();
  }

  public borrowBook(description:string, return_date:Date):void{
    this.selectedUserBook.borrowed = true;
    this.bookService.borrowBook(
      this.borrowedBook = {
      ownedBook: this.selectedUserBook,
      borrowDate: new Date(),
      returnDate: return_date,
      borrowDescription: description
    }).subscribe(()=>{
      this.bookService.deleteBookFromMem(this.selectedUserBook, this.bookService.userBooks);
      console.log("Book borrowed successfully!");
      this.closeBorrow();
    });
    Toast.getToast("Book borrowed successfully!");

  }

  public closeBorrow():void{
    this.closeModal();
  }

}
