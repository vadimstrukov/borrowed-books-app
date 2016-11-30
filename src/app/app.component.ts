import {Component, OnInit, ViewChild} from '@angular/core';
import {BookItems} from "./model/BookItems";
import {BookService} from "./service/BookService";
import {FormControl} from "@angular/forms";
import {LoginRegisterModal} from "./directives/login.directive";
import {Authentication} from "./utils/Authentication";
import {User} from "./model/User";
import {Book} from "./model/Book";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BookService, Authentication]
})

export class AppComponent implements OnInit{
  books: BookItems;
  userBooks:Array<Book>;
  selectedBook:Book;
  isInfoExpanded:boolean = false;

  searchControl = new FormControl();
  user:User;
  @ViewChild('login') loginModal:LoginRegisterModal;

  loader:JQuery;
  arrowDelete:JQuery;

  constructor(private bookService: BookService, private auth:Authentication){
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
          this.books = null;
          this.showLoaderHideArrow();
        }
      });
  }

  getUserBooks(){
    this.bookService.getUserBooks().subscribe(data=>this.books = data);
    console.log(this.books);
  }

  addBook(){
    this.bookService.saveBook(this.selectedBook).subscribe(()=>{
      console.log("Book saved");
    });
  }

  ngOnInit() {
    $('.button-collapse').sideNav();
    if(this.auth.access_token)
      this.auth.getAuthUser().subscribe(data => this.user = data);

    $('div').click(function () {
      $(this).attr('class');
    })
  }

  private hideLoaderShowArrow(){
    this.loader.fadeOut('slow');
    if ($(window).width() < 500){
      $('.jq-right').fadeOut('slow');
      $('.u-search--div').addClass('u-make--wider');
    }
    this.arrowDelete.removeClass('rollOut u-display--none').addClass('rollIn');
  }

  private showLoaderHideArrow(){
    this.loader.fadeIn('slow');
    if ($(window).width() < 500){
      $('.jq-right').fadeIn('slow');
      $('.u-search--div').removeClass('u-make--wider');
    }
    this.arrowDelete.toggleClass('rollIn').addClass("rollOut").queue(function(){
      $(this).addClass('u-display--none');
      $('.u-go--top').fadeOut('slow');
      $(this).dequeue();
    });
  }

  openLogin(){
    this.loginModal.openModal();
  }

  logout(){
    this.auth.logout().subscribe(()=>{this.user = null; location.reload()});
  }

  openDropDown() {
    if ($('.dropdown-content').css('display') == 'none') {
      $('.dropdown-button').css({
        'background-color': 'white',
        'color': '#26a69a'
      });
      $('.dropdown-content').show().animate({'opacity': '1'}, 'fast');
    } else {
      $('.dropdown-button').css({
        'background-color': '#00897b',
        'color': 'white'
      });
      $('.dropdown-content').animate({'opacity': '0'}, 'fast').queue(function () {
        $('.dropdown-content').hide();
        $(this).dequeue();
      });
    }
  }

  scrollWindowToTop(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }

  removeAttrStyle(){
    $('.u-input--search').removeAttr('style');
  }

  clearSearchBox(){
    this.searchControl.setValue("");
    this.arrowDelete.addClass("rollOut");
    if($('.u-search--div').hasClass('u-make--wider') && $(window).width() < 500){
      $('.u-search--div').toggleClass('u-make--wider');
    }else{
      $('.u-input--search').css(
        'width', '200px'
      );
    }
  }

  makeItWider(){
    if ($(window).width() < 500){
      if(!$('.u-search--div').hasClass('u-make--wider')){
        $('.jq-right').fadeOut('fast');
        $('.u-search--div').toggleClass('u-make--wider');
      }
    }
  }

  removeWider(){
    if ($(window).width() < 500 && $('.u-input--search').val().length == 0) {
      $('.jq-right').fadeIn('slow');
      $('.u-search--div').toggleClass('u-make--wider');
    }
  }

  onScroll(){
    this.bookService.startIndex += 10;
    this.bookService.getBooksByTitle(this.searchControl.value).subscribe(data => {
      for(let book of data.items)
        this.books.items.push(book);
    });
  }

  private selectBook(book:Book, expandable:boolean){
    this.selectedBook = book;
    this.isInfoExpanded = expandable;
  };

  private clearInformationBlock():void{
    $('.u-border--top_ + .u-information--about').remove();
    $('.u-was--245px').toggleClass('u-was--245px u-height--245px_');
    $('.clicked_ .u-border--top_').toggleClass('limit u-height--75px');
    $('.clicked_').toggleClass('clicked_');
  }

  public bookClicked(book:Book, event:any){
    switch (this.selectedBook){
      case book:
        this.selectBook(null, false);
        this.clearInformationBlock();
        break;
      default:
        this.selectBook(book, true);
        var clickedParent = $(event.target).parents('.col');
        this.clearInformationBlock();
        clickedParent.toggleClass('clicked_');
        $('.clicked_ .u-height--245px_').toggleClass('u-height--245px_ u-was--245px');
        $(`.clicked_ .u-width--145px`).toggleClass('u-height--245px_');
        $('.clicked_ .u-border--top_').toggleClass('limit u-height--75px').delay(1).queue(function () {
          $('.u-additional--information').insertAfter('.clicked_ .u-border--top_');
          $(this).dequeue();
        });
    }
  }
}
