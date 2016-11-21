/**
 * Created by strukov on 20.11.16.
 */
import {Component, OnInit} from "@angular/core";
@Component({
  selector: "login",
  templateUrl: "./login.html",
  styleUrls: ['./login-styles.css']
})
export class LoginModal implements OnInit{

  ngOnInit(): void {
    $('.modal').modal();
  }

  public openModal(){
    $('#login').modal('open');
  }

  public closeModal(){
    $('#login').modal('close');
  }

}
