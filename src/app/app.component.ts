import {Component, OnInit, ViewChild} from '@angular/core';
import {BookService} from "./service/BookService";
import {FormControl} from "@angular/forms";
import {LoginRegisterModal} from "./directives/login.directive";
import {Authentication} from "./utils/Authentication";
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {


  searchControl = new FormControl();
  @ViewChild('login') loginModal:LoginRegisterModal;

  loader:JQuery;
  arrowDelete:JQuery;

  constructor(private bookService: BookService, public auth:Authentication, private router:Router){
    this.searchControl.valueChanges.debounceTime(500).distinctUntilChanged()
      .subscribe((value : string) => {
        bookService.startIndex = 1;
        this.loader = $('.loader-preview');
        this.arrowDelete = $('.u-arrow--delete');
        if(value.length>0)
          router.navigate(['/search'], {queryParams : {q: value}});
        else
          router.navigate(['/library']);
      });
  }

  ngOnInit() {
    $('.button-collapse').sideNav();

    $('div').click(function () {
      $(this).attr('class');
    });
  }

  public closeSideNav():void{
    $('.button-collapse').sideNav('hide');
  }

  // private hideLoaderShowArrow(){
  //   this.loader.fadeOut('slow');
  //   if ($(window).width() < 500){
  //     $('.jq-right').fadeOut('slow');
  //     $('.u-search--div').addClass('u-make--wider');
  //   }
  //   this.arrowDelete.fadeIn('slow');
  //   $('.u-go--top').fadeIn('slow');
  // }
  //
  // private showLoaderHideArrow():void{
  //   this.loader.fadeIn('slow');
  //   if ($(window).width() < 500){
  //     $('.jq-right').fadeIn('slow');
  //     $('.u-search--div').removeClass('u-make--wider');
  //   }
  //   this.arrowDelete.fadeOut('fast');
  //   $('.u-go--top').fadeOut('slow');
  // }

  public openLogin():void{
    this.loginModal.openModal();
  }

  public logout():void{
    this.auth.logout().subscribe(()=>{location.reload()});
  }


 private scrollWindowToTop():void{
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }


  public clearSearchBox():void {
    this.searchControl.setValue("");
    this.arrowDelete.fadeOut('fast');
    if ($('.u-search--div').hasClass('u-make--wider') && $(window).width() < 500)
      $('.u-search--div').toggleClass('u-make--wider');
    else
      $('.u-input--search').css('width', '200px');
  }

  public makeItWider():void{
    $('.u-input--search').removeAttr('style');
    if ($(window).width() < 500){
      if(!$('.u-search--div').hasClass('u-make--wider')){
        $('.jq-right').fadeOut('fast');
        $('.u-search--div').toggleClass('u-make--wider');
      }
    }
  }

  public removeWider():void{
    if ($(window).width() < 500 && $('.u-input--search').val().length == 0) {
      $('.jq-right').fadeIn('slow');
      $('.u-search--div').toggleClass('u-make--wider');
    }
  }


}
