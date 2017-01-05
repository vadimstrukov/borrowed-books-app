/**
 * Created by strukov on 30.11.16.
 */
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from "@angular/core";
import {BookService} from "../../service/BookService";
import {BookItems} from "../../model/BookItems";
import {Book} from "../../model/Book";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {Authentication} from "../../service/AuthService";
import {BookInfoModal} from "./bookinfo.directive";

@Component({
  templateUrl: 'searchbook.html',
  styleUrls: ['../../app.component.scss'],
  animations: [
    trigger('zoomIn', [
      state('in', style({'-webkit-transform': 'scale3d(1, 1, 1)', transform: 'scale3d(1, 1, 1)'})),
      transition('void => *', [
        animate(300, keyframes([
          style({opacity: 0, '-webkit-transform': 'scale3d(.3, .3, .3)', transform: 'scale3d(.3, .3, .3)'}),
          style({opacity: 1, '-webkit-transform': 'scale3d(1, 1, 1)', transform: 'scale3d(1, 1, 1)'})
        ]))
      ]),
      transition('* => void', [
        animate(100, keyframes([
          style({opacity: 1, '-webkit-transform': 'scale3d(1, 1, 1)', transform: 'scale3d(1, 1, 1)'}),
          style({opacity: 0, '-webkit-transform': 'scale3d(.3, .3, .3)', transform: 'scale3d(.3, .3, .3)'})
        ]))
      ])
    ])
  ]
})
export class SearchBooks implements OnInit, OnDestroy {

  public books: BookItems;
  private query: any;
  private subscription: Subscription;
  @ViewChild('bookinfo')
  public bookInfoModal: BookInfoModal;

  constructor(private bookService: BookService, private route: ActivatedRoute, public auth: Authentication) {
  }

  ngOnInit(): void {
    this.bookService.startIndex = 1;
    this.subscription = this.route.queryParams.subscribe((param: any) => {
      this.query = param['q'];
      if (this.query != null)
        this.bookService.getBooksByTitle(this.query).subscribe(data => this.books = data);
      else {
        this.books = null;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  public openAdditionalInfo(book: Book): void {
    this.bookInfoModal.openInfo(book.id);
  }

  public onScroll(): void {
    this.bookService.startIndex += 10;
    this.bookService.getBooksByTitle(this.query).subscribe(data => {
      for (let book of data.items)
        this.books.items.push(book);
    });
  }

}
