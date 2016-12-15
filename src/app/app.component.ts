import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {LoginRegisterModal} from "./directives/login/login.directive";
import {Authentication} from "./utils/Authentication";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent implements OnInit {

  public searchControl = new FormControl();
  @ViewChild('login')
  private loginModal:LoginRegisterModal;

  constructor(public auth:Authentication, private router:Router){
    this.searchControl.valueChanges.debounceTime(500).distinctUntilChanged()
      .subscribe((value : string) => {
        if(value.length>0){
          router.navigate(['/search'], {queryParams : {q: value}});
          this.fadeInArrow('slow');
        }
        else{
          router.navigate(['/search'], {queryParams : {}});
          this.fadeOutArrow('fast');
        }
      });
  }

  ngOnInit() {
    setTimeout(()=>{
      $('.button-collapse').sideNav();
    }, 500);
    $('div').click(function () {
      $(this).attr('class');
    });
  }

  public openLibrary():void{
    $('.button-collapse').sideNav('hide');
    this.router.navigate(['/library']);
  }

  private fadeInArrow(duration:string):void{
    if ($(window).width() < 500){
      $('.jq-right').fadeIn(duration);
      $('.u-search--div').addClass('u-make--wider');
    }
    $('.u-arrow--delete').fadeIn(duration);
    $('.u-go--top').fadeIn(duration);
  }

  private fadeOutArrow(duration:string):void{
    if ($(window).width() < 500){
      $('.jq-right').fadeOut(duration);
      $('.u-search--div').removeClass('u-make--wider');
    }
    $('.u-arrow--delete').fadeOut(duration);
    $('.u-go--top').fadeOut(duration);
  }


  public openLogin():void{
    this.loginModal.openLogin();
  }

  public logout():void{
    this.auth.logout().subscribe(()=>{
      location.reload();
      this.router.navigate(['/search'], {queryParams: {}});
    });
  }


 public scrollWindowToTop():void{
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }


  public clearSearchBox():void {
    this.searchControl.setValue("");
  }


}
