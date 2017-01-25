import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {InfiniteScrollModule} from "angular2-infinite-scroll";
import {LoginRegisterModal} from "./directives/login/login.directive";
import {UserBooks} from "./directives/book/userbooks.directive";
import {Authentication} from "./service/AuthService";
import {CanActivateViaAuth} from "./utils/CanActivateViaAuth";
import {SearchBooks} from "./directives/book/searchbooks.directive";
import {BookService} from "./service/BookService";
import {UserService} from "./service/UserService";
import {BookInfoModal} from "./directives/book/bookinfo.directive";
import {AppRoutingModule} from "./app-routing.module";
import {BorrowBookModal} from "./directives/book/borrowbook.directive";
import {BorrowedBooks} from "./directives/book/borrowedbooks.directive";
import { ReCaptchaModule } from 'angular2-recaptcha';


@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterModal,
    BookInfoModal,
    BorrowBookModal,
    BorrowedBooks,
    UserBooks,
    SearchBooks
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    AppRoutingModule,
    ReCaptchaModule
  ],
  providers: [Authentication, CanActivateViaAuth, BookService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
