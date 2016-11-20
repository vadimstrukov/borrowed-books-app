import {Component, OnInit, ViewChild} from '@angular/core';
import {BookItems} from "./model/BookItems";
import {BookService} from "./service/BookService";
import {FormControl} from "@angular/forms";
import {LoginModal} from "./directives/login.directive";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BookService]
})
export class AppComponent implements OnInit{
  books: BookItems;
  searchControl = new FormControl();
  @ViewChild('login') loginModal:LoginModal;

  loader:JQuery;
  arrowDelete:JQuery;

  constructor(private bookService: BookService){
    this.searchControl.valueChanges.debounceTime(500).distinctUntilChanged()
      .subscribe((value : string) => {
        bookService.startIndex = 1;
        this.loader = $('.loader-preview');
        this.arrowDelete = $('.u-arrow--delete');
        if(value.length>0){
          bookService.getBooksByTitle(value).subscribe(data => this.books = data);
          this.hideLoaderShowArrow();
        }
        else{
          this.books.items.length = 0;
          this.showLoaderHideArrow();
        }
      });
  }

  ngOnInit() {
    $('.button-collapse').sideNav();
  }

  private hideLoaderShowArrow(){
    this.loader.fadeOut('slow');
    this.arrowDelete.removeClass('rollOut u-display--none').addClass('rollIn');
  }

  private showLoaderHideArrow(){
    this.loader.fadeIn('slow');
    this.arrowDelete.toggleClass('rollIn').addClass("rollOut").delay(1000).queue(function(){
      $(this).addClass('u-display--none');
    });
  }

  openLogin(){
    this.loginModal.openModal();
  }

  scrollWindowToTop(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }

  removeAttrStyle(){
    $('.u-input--search').removeAttr('style');
  }

  clearSearchBox(){
    this.searchControl.setValue("");
    $('.u-input--search').css(
      'width', '200px'
    );
    this.arrowDelete.addClass("rollOut");
  }

  onScroll(){
    this.bookService.startIndex += 10;
    this.bookService.getBooksByTitle(this.searchControl.value).subscribe(data => {
      for(let book of data.items)
        this.books.items.push(book);
    });
  }



}
