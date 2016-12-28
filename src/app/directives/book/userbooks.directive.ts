/**
 * Created by strukov on 30.11.16.
 */
import {Component, OnInit, ViewChild} from "@angular/core";
import {BookService} from "../../service/BookService";
import {OwnedBook} from "../../model/OwnedBook";
import {element} from "protractor";
import {Book} from "../../model/Book";
import {BookInfoModal} from "./bookinfo.directive";
import {FormGroup, FormBuilder} from "@angular/forms";
import {Options} from "./radio.options";
import {Input, trigger, state, style, transition, animate, keyframes} from '@angular/core';
import {BorrowBookModal} from "./borrowbook.directive";
import {Toast} from "../../utils/Toast";

@Component({
  templateUrl: 'userbooks.html',
  styleUrls: ['../../app.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({'-webkit-transform': 'perspective(400px) rotate3d(1, 0, 0, 90deg)', transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)'})),
        transition('void => *', [
          animate(300, keyframes([
            style({opacity: 1, '-webkit-transform': 'perspective(400px) rotate3d(1, 0, 0, 90deg)', transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)', '-webkit-animation-timing-function': 'ease-in', 'animation-timing-function': 'ease-in'}),
            style({'-webkit-transform': 'perspective(400px) rotate3d(1, 0, 0, -20deg)', transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)', '-webkit-animation-timing-function': 'ease-in', 'animation-timing-function': 'ease-in'}),
            style({opacity: 1, '-webkit-transform': 'perspective(400px) rotate3d(1, 0, 0, 10deg)', transform: 'perspective(400px) rotate3d(1, 0, 0, 10deg)'}),
            style({'-webkit-transform': 'perspective(400px) rotate3d(1, 0, 0, -5deg)', transform: 'perspective(400px) rotate3d(1, 0, 0, -5deg)'}),
            style({'-webkit-transform': 'perspective(400px)', transform: 'perspective(400px)'})
          ]))
        ]),
      transition('* => void', [
        animate(100, keyframes([
        style({'-webkit-transform': 'perspective(400px)', transform: 'perspective(400px)'}),
        style({'-webkit-transform': 'perspective(400px) rotate3d(1, 0, 0, -5deg)', transform: 'perspective(400px) rotate3d(1, 0, 0, -5deg)'}),
        style({'-webkit-transform': 'perspective(400px) rotate3d(1, 0, 0, 10deg)', transform: 'perspective(400px) rotate3d(1, 0, 0, 10deg)'}),
        style({'-webkit-transform': 'perspective(400px) rotate3d(1, 0, 0, -20deg)', transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)', '-webkit-animation-timing-function': 'ease-in', 'animation-timing-function': 'ease-in'}),
        style({opacity: 1, '-webkit-transform': 'perspective(400px) rotate3d(1, 0, 0, 90deg)', transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)', '-webkit-animation-timing-function': 'ease-in', 'animation-timing-function': 'ease-in'})
        ]))
      ])
    ])
  ]
})

export class UserBooks implements OnInit{
  public selectedBook:OwnedBook;
  public parentId:string;
  private statusExpanded:boolean = false;
  @ViewChild('bookinfo')
  public bookInfoModal:BookInfoModal;
  @ViewChild('borrowbook')
  public borrowBookModal: BorrowBookModal;
  selectedOption:Options;
  options = [
    new Options('READING'),
    new Options('DONE'),
    new Options('UNREAD'),
  ];

  constructor(public bookService:BookService){}

  ngOnInit():void{
    this.bookService.getUserBooks();
  }

  private getValue(name:string) {
    this.selectedOption = this.options.filter((item)=> item.name == name)[0];
    this.selectedBook.readStatus = this.selectedOption.name;
    this.bookService.updateUserBook(this.selectedBook).subscribe(()=>{
      console.log("Status updated!");
    });
  }

  public deleteUserBook(userBook:OwnedBook):void{
    this.bookService.deleteUserBook(userBook);
    Toast.getToast("Book deleted successfully!");

  }

  public openAdditionalInfo(book:Book) : void{
    this.bookInfoModal.openInfo(book.id);
  }

  public borrowBook(userBook:OwnedBook): void{
    this.borrowBookModal.openBorrow(userBook, "SAVE");
  }

  public expandEditPanel(event:any, userBook:OwnedBook){
    switch (this.parentId){
      case userBook.book.id:
        this.statusExpanded = false;
        this.parentId = null;
        break;
      default:
        this.statusExpanded = true;
        this.parentId = event.target.parentNode.id;
        this.selectedOption = new Options(userBook.readStatus);
        this.selectedBook = userBook;
    }
  }
}
