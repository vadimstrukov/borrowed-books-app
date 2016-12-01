/**
 * Created by strukov on 20.11.16.
 */
import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Authentication} from "../utils/Authentication";
import {FormType} from "./FormType";
import {UserService} from "../service/UserService";
import {User} from "../model/User";
import {hashSync} from "bcryptjs";

@Component({
  selector: "login",
  templateUrl: "./login.html",
  styleUrls: ['./login-styles.css']
})
export class LoginRegisterModal implements OnInit{

  submitForm: FormGroup;
  error: boolean = false;

  isRegister: boolean = false;
  formType:string = FormType[FormType.LOGIN];
  buttonName:string = "Sign up";

  constructor(private formBuilder:FormBuilder, private auth:Authentication, private userService:UserService){}

  ngOnInit(): void {
    $('.modal').modal();
    this.submitForm = this.formBuilder.group({
      email: ['',[<any>Validators.required]],
      password: ['', [<any>Validators.required]],
      fullname: ['', [<any>Validators.required]]
    });
  }

  public onSubmit(value:any){
    switch (this.formType){
      case FormType[FormType.LOGIN]:

        this.auth.authenticate(value.email, value.password).subscribe(() => {
          this.closeModal();
          location.reload(); }, () => { this.error = true; });
        break;

      case FormType[FormType.REGISTER]:

        let user = new User();
        user.email = value.email;
        user.fullname = value.fullname;
        user.pass = hashSync(value.password, 4);
        this.userService.register(user).subscribe(() => {
          this.setFormType(false, "Sign up", FormType[FormType.LOGIN], 'Login');}, () => {
          this.error = true; });
        break;
    }
  }

  public openModal(){
    $('#login').modal('open');
  }

  public closeModal(){
    $('#login').modal('close');
  }

  public changeFormType(){
    if(!this.isRegister)
      this.setFormType(true, "Sign in", FormType[FormType.REGISTER], 'Registration');
    else
      this.setFormType(false, "Sign up", FormType[FormType.LOGIN], 'Login');
  }

  private setFormType(isRegister:boolean, buttonName:string, formType:string, hText:string){
    this.isRegister = isRegister;
    this.formType = formType;
    this.buttonName = buttonName;
    $('.modal-content > h4').text(hText);
  }
}
