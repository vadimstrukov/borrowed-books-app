/**
 * Created by strukov on 20.11.16.
 */
import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Authentication} from "../utils/Authentication";
import {FormType} from "./FormType";

@Component({
  selector: "login",
  templateUrl: "./login.html",
  styleUrls: ['./login-styles.css'],
  providers: [Authentication]
})
export class LoginRegisterModal implements OnInit{

  submitForm: FormGroup;
  error: boolean = false;

  isRegister: boolean = false;
  formType:string = FormType[FormType.REGISTER];

  constructor(private formBuilder:FormBuilder, private auth:Authentication){}

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
        // this.auth.authenticate(value.email, value.password).subscribe((token: any) => {
        //       this.closeModal();
        //       location.reload(); }, () => { this.error = true; });
        console.log("Logged in");
        break;
      case FormType[FormType.REGISTER]:
        console.log("Registered");
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
      this.setFormType(true, FormType[FormType.LOGIN], 'Registration');
    else
      this.setFormType(false, FormType[FormType.REGISTER], 'Sign in');
  }

  private setFormType(isRegister:boolean, formType:string, hText:string){
    this.isRegister = isRegister;
    this.formType = formType;
    $('.modal-content > h4').text(hText);
  }
}
