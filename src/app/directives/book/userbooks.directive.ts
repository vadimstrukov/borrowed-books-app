/**
 * Created by strukov on 30.11.16.
 */
import {Component, ViewChild, trigger, state, style, transition, animate, keyframes} from "@angular/core";
import {BookService, deleteBookFromMem} from "../../service/BookService";
import {OwnedBook} from "../../model/OwnedBook";
import {Book} from "../../model/Book";
import {BookInfoModal} from "./bookinfo.directive";
import {Options} from "./radio.options";
import {BorrowBookModal} from "./borrowbook.directive";
import {Toast} from "../../utils/Toast";
import {Constants} from "../../utils/Constants";

@Component({
  templateUrl: 'userbooks.html',
  styleUrls: ['../../app.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({
        '-webkit-transform': 'perspective(400px) rotate3d(1, 0, 0, 90deg)',
        transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)'
      })),
      transition('void => *', [
        animate(300, keyframes([
          style({
            opacity: 1,
            '-webkit-transform': 'perspective(400px) rotate3d(1, 0, 0, 90deg)',
            transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)',
            '-webkit-animation-timing-function': 'ease-in',
            'animation-timing-function': 'ease-in'
          }),
          style({
            '-webkit-transform': 'perspective(400px) rotate3d(1, 0, 0, -20deg)',
            transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)',
            '-webkit-animation-timing-function': 'ease-in',
            'animation-timing-function': 'ease-in'
          }),
          style({
            opacity: 1,
            '-webkit-transform': 'perspective(400px) rotate3d(1, 0, 0, 10deg)',
            transform: 'perspective(400px) rotate3d(1, 0, 0, 10deg)'
          }),
          style({
            '-webkit-transform': 'perspective(400px) rotate3d(1, 0, 0, -5deg)',
            transform: 'perspective(400px) rotate3d(1, 0, 0, -5deg)'
          }),
          style({'-webkit-transform': 'perspective(400px)', transform: 'perspective(400px)'})
        ]))
      ]),
      transition('* => void', [
        animate(100, keyframes([
          style({'-webkit-transform': 'perspective(400px)', transform: 'perspective(400px)'}),
          style({
            '-webkit-transform': 'perspective(400px) rotate3d(1, 0, 0, -5deg)',
            transform: 'perspective(400px) rotate3d(1, 0, 0, -5deg)'
          }),
          style({
            '-webkit-transform': 'perspective(400px) rotate3d(1, 0, 0, 10deg)',
            transform: 'perspective(400px) rotate3d(1, 0, 0, 10deg)'
          }),
          style({
            '-webkit-transform': 'perspective(400px) rotate3d(1, 0, 0, -20deg)',
            transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)',
            '-webkit-animation-timing-function': 'ease-in',
            'animation-timing-function': 'ease-in'
          }),
          style({
            opacity: 1,
            '-webkit-transform': 'perspective(400px) rotate3d(1, 0, 0, 90deg)',
            transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)',
            '-webkit-animation-timing-function': 'ease-in',
            'animation-timing-function': 'ease-in'
          })
        ]))
      ])
    ])
  ]
})

export class UserBooks {
  public userBooks: Array<OwnedBook>;
  public selectedBook: OwnedBook;
  public parentId: string;
  private statusExpanded: boolean = false;
  @ViewChild('bookinfo')
  public bookInfoModal: BookInfoModal;
  @ViewChild('borrowbook')
  public borrowBookModal: BorrowBookModal;
  selectedOption: Options;
  options = [
    new Options('READING'),
    new Options('DONE'),
    new Options('UNREAD'),
  ];

  constructor(public bookService: BookService) {
    this.bookService.getItems(Constants.OwnedBooks).subscribe(
      data => this.userBooks = data,
      e => Toast.getToast(e));
  }

  public updateBookStatus(name: string): void {
    this.selectedOption = this.options.filter((item) => item.name == name)[0];
    this.selectedBook.readStatus = this.selectedOption.name;
    this.bookService.updateItem(this.selectedBook, Constants.OwnedBooks).subscribe(
      () => console.log("Updating!"),
      e => Toast.getToast(e),
      () => Toast.getToast("Book status successfully updated!")
    );

  }

  public deleteUserBook(userBook: OwnedBook): void {
    this.bookService.deleteItem(userBook.id.toString(), Constants.OwnedBooks)
      .subscribe(
        () => {
          deleteBookFromMem(userBook, this.userBooks);
          this.bookService.getLibraryLength();
        },
        e => Toast.getToast(e),
        () => Toast.getToast("Book deleted successfully!"));
  }

  public openAdditionalInfo(book: Book): void {
    this.bookInfoModal.openInfo(book.id);
  }

  public borrowBook(userBook: OwnedBook): void {
    this.borrowBookModal.openBorrow(userBook);
  }

  public expandEditPanel(event: any, userBook: OwnedBook) {
    switch (this.parentId) {
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
