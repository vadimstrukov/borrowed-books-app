/**
 * Created by strukov on 20.11.16.
 */
import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Authentication} from "../utils/Authentication";

@Component({
  selector: "login",
  templateUrl: "./login.html",
  styleUrls: ['./login-styles.css'],
  providers: [Authentication]
})
export class LoginModal implements OnInit{

  loginForm: FormGroup;
  error: boolean = false;

  constructor(private formBuilder:FormBuilder, private auth:Authentication){}

  ngOnInit(): void {
    $('.modal').modal();
    this.loginForm = this.formBuilder.group({
      email: ['',[<any>Validators.required]],
      password: ['', [<any>Validators.required]]
    });
  }

  public onSubmit(value:any){
    this.auth.authenticate(value.email, value.password)
      .subscribe(
        (token: any) => {
          this.closeModal();
          location.reload();
        },
        () => { this.error = true; }
      );
  }

  public openModal(){
    $('#login').modal('open');
  }

  public closeModal(){
    $('#login').modal('close');
  }

  registerMe(){
    $('.jq-form > .row > .u-display--none').toggleClass('u-display--none u-were--invisible');
    $('.u-float--left').toggleClass('u-display--none');
    $('.jq-login').text('Register');
    $('.modal-content > h4').text('Registration');
  }

  loginMe(){
    $('.jq-form > .row > .u-were--invisible').toggleClass('u-display--none u-were--invisible');
    $('.u-float--left').toggleClass('u-display--none');
    $('.jq-login').text('Login');
    $('.modal-content > h4').text('Sign in');
  }
}
