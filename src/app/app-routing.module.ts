import {CanActivateViaAuth} from "./utils/CanActivateViaAuth";
import {UserBooks} from "./directives/book/userbooks.directive";
import {SearchBooks} from "./directives/book/searchbooks.directive";
import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {BorrowedBooks} from "./directives/book/borrowedbooks.directive";
/**
 * Created by strukov on 7.12.16.
 */
const routes: Routes = [
  {path: '', redirectTo: 'search', pathMatch: 'full'},
  {path: 'search', component:SearchBooks},
  {path: 'library', component: UserBooks, canActivate: [CanActivateViaAuth]},
  {path: 'borrowed', component: BorrowedBooks, canActivate: [CanActivateViaAuth]}
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule{}
