/**
 * Created by strukov on 20.11.16.
 */
import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../service/UserService";
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
        (token: any) => this.closeModal(),
        () => { this.error = true; }
      );
  }

  public openModal(){
    $('#login').modal('open');
  }

  public closeModal(){
    $('#login').modal('close');
  }

}
