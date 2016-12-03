import {Component, OnInit, ViewChild} from '@angular/core';
import {BookService} from "./service/BookService";
import {FormControl} from "@angular/forms";
import {LoginRegisterModal} from "./directives/login.directive";
import {Authentication} from "./utils/Authentication";
import {Router} from "@angular/router";
import {Constants} from "./utils/Constants";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  public searchControl = new FormControl();
  @ViewChild('login')
  private loginModal:LoginRegisterModal;

  private loader:JQuery;
  private arrowDelete:JQuery;

  constructor(private bookService: BookService, public auth:Authentication, private router:Router){
    this.searchControl.valueChanges.debounceTime(500).distinctUntilChanged()
      .subscribe((value : string) => {
        bookService.startIndex = 1;
        this.loader = $('.loader-preview');
        this.arrowDelete = $('.u-arrow--delete');
        if(value.length>0){
          router.navigate(['/search'], {queryParams : {q: value}});
          this.adjustLoaderAndArrow('slow', false);
        }
        else{
          router.navigate(['/search'], {queryParams : {}});
          this.adjustLoaderAndArrow('fast', true);
        }
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

  private adjustLoaderAndArrow(duration:string, addOrRemove:boolean):void{
    this.loader.fadeToggle(duration);
    if ($(window).width() < 500){
      $('.jq-right').fadeToggle(duration);
      $('.u-search--div').toggleClass('u-make--wider', addOrRemove);
    }
    this.arrowDelete.fadeToggle(duration);
    $('.u-go--top').fadeToggle(duration);
  }


  public openLogin():void{
    this.loginModal.openLogin();
  }

  public logout():void{
    this.auth.logout().subscribe(()=>{location.reload()});
  }


 public scrollWindowToTop():void{
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }


  public clearSearchBox():void {
    this.searchControl.setValue("");
  }


}
