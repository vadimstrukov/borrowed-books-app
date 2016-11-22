import {Component, OnInit, ViewChild} from '@angular/core';
import {BookItems} from "./model/BookItems";
import {BookService} from "./service/BookService";
import {FormControl} from "@angular/forms";
import {LoginRegisterModal} from "./directives/login.directive";
import {Authentication} from "./utils/Authentication";
import {User} from "./model/User";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BookService, Authentication]
})

export class AppComponent implements OnInit{
  books: BookItems;
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
          this.books.items.length = 0;
          this.showLoaderHideArrow();
        }
      });
  }

  ngOnInit() {
    $('.button-collapse').sideNav();
    if(this.auth.access_token)
      this.auth.getAuthUser().subscribe(data => this.user = data);
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
    this.arrowDelete.toggleClass('rollIn').addClass("rollOut").delay(1000).queue(function(){
      $(this).addClass('u-display--none');
    });
  }

  openLogin(){
    this.loginModal.openModal();
  }

  logout(){
    this.auth.logout().subscribe(data=>this.user = null);
    location.reload();
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



}
