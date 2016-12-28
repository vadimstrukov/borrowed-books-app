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
  selectedBook:any;
  actionType:string;
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

  public openBorrow<T>(book:T, actionType:string):void{
    this.actionType = actionType;
    this.selectedBook = book;
    this.openModal();
  }

  public borrowBook(description:string, return_date:Date):void{
    this.selectedBook.borrowed = true;
    this.bookService.borrowBook(
      this.borrowedBook = {
      ownedBook: this.selectedBook,
      borrowDate: new Date(),
      returnDate: return_date,
      borrowDescription: description
    }).subscribe(()=>{
      this.bookService.deleteBookFromMem(this.selectedBook, this.bookService.userBooks);
      console.log("Book borrowed successfully!");
      this.closeBorrow();
    });
    Toast.getToast("Book borrowed successfully!");
  }

  public updateBorrowed(description:string, return_date:Date){
    this.selectedBook.borrowDescription = description;
    this.selectedBook.returnDate = return_date;
    this.bookService.updateBorrowedBook(this.selectedBook).subscribe(()=> {
      console.log("Borrowed book updated!");
      this.closeBorrow();
    });
  }

  public closeBorrow():void{
    this.closeModal();
  }

}
