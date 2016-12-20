/**
 * Created by strukov on 20.11.16.
 */
import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {Authentication} from "../../utils/Authentication";
import {UserService} from "../../service/UserService";
import {User} from "../../model/User";
import {hashSync} from "bcryptjs";
import {ModalBehaviour} from "../modal.directive";
import {Constants} from "../../utils/Constants";
import {Router} from "@angular/router";
import {SubmitForm} from "./form.interface";

@Component({
  selector: "login",
  templateUrl: "login.html",
  styleUrls: ['login-styles.scss']
})
export class LoginRegisterModal extends ModalBehaviour implements OnInit{

  public submitForm: FormGroup;
  public authError: boolean = false;
  public buttonName:string;

  public FORM_TYPE = {
    LOGIN: 'login',
    REGISTRATION: 'registration'
  };


  constructor(private fb:FormBuilder, private auth:Authentication, private userService:UserService,  private router:Router){
    super();
  }

  ngOnInit():void{
    super.ngOnInit();
    this.submitForm = this.fb.group({
      email: ['', [<any>Validators.required, Validators.maxLength(30)]],
      password: ['', [<any>Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      formType: this.initFormTypeGroup()
    });
    this.subscribeFormTypeChanges();
    this.setFormType(this.FORM_TYPE.LOGIN);
  }

  initFormTypeGroup() {
    return this.fb.group({
      type: [''],
      login: this.fb.group(this.initLoginModel()),
      registration: this.fb.group(this.initRegistrationModel()),
    });
  }

  subscribeFormTypeChanges() {

    const pmCtrl = (<any>this.submitForm).controls.formType;
    const loginCtrl = pmCtrl.controls.login;
    const regCtrl = pmCtrl.controls.registration;

    pmCtrl.controls.type.valueChanges.subscribe(formType => {
      if (formType === this.FORM_TYPE.LOGIN) {
        Object.keys(loginCtrl.controls).forEach(key => {
          loginCtrl.controls[key].setValidators(this.initLoginModel()[key][1]);
          loginCtrl.controls[key].updateValueAndValidity();
        });
        Object.keys(regCtrl.controls).forEach(key => {
          regCtrl.controls[key].setValidators(null);
          regCtrl.controls[key].updateValueAndValidity();
        });
        this.buttonName = "Sign in";
      }

      if (formType === this.FORM_TYPE.REGISTRATION) {
        Object.keys(loginCtrl.controls).forEach(key => {
          loginCtrl.controls[key].setValidators(null);
          loginCtrl.controls[key].updateValueAndValidity();
        });
        Object.keys(regCtrl.controls).forEach(key => {
          regCtrl.controls[key].setValidators(this.initRegistrationModel()[key][1]);
          regCtrl.controls[key].updateValueAndValidity();
        });
        this.buttonName = "Sign up";
      }
    });
  }

  initRegistrationModel() {
    return {
      fullname: ['', [<any>Validators.required, Validators.minLength(10), Validators.maxLength(50)]]
    };
  }

  initLoginModel() {
    return {
      isHuman: [false, Validators.pattern('true')]
    };
  }

  setFormType(type: string) {
    const ctrl: FormControl = (<any>this.submitForm).controls.formType.controls.type;
    ctrl.setValue(type);
  }

  onSubmit(model: SubmitForm, isValid: boolean) {
    switch (model.formType.type){
      case this.FORM_TYPE.LOGIN:
        this.auth.authenticate(model.email, model.password).subscribe(() => {
          this.closeLogin();
        }, () => {
          this.authError = true
        }, ()=>{
          setTimeout(()=>{
            location.reload();
            this.router.navigate(['/library']);
          }, 500);
        });
        break;
      case this.FORM_TYPE.REGISTRATION:
        let user = new User();
        user.email = model.email;
        user.fullname = model.formType.registration.fullname;
        user.pass = hashSync(model.password, 4);
        this.userService.register(user).subscribe(() => {
          this.setFormType(this.FORM_TYPE.LOGIN);
        },
          () => {
          this.authError = true;
        });
        break;
    }
    console.log(model, isValid);
  }


  public openLogin():void{
    this.openModal(Constants.LoginModal);
  }
  public closeLogin():void{
    this.closeModal(Constants.LoginModal);
  }
}
