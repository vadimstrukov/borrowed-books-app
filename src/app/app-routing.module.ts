import {CanActivateViaAuth} from "./utils/CanActivateViaAuth";
import {UserBooks} from "./directives/userbooks.directive";
import {SearchBooks} from "./directives/searchbooks.directive";
import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
/**
 * Created by strukov on 7.12.16.
 */
const routes: Routes = [
  {path: '', redirectTo: 'search', pathMatch: 'full'},
  {path: 'search', component:SearchBooks},
  {path: 'library', component: UserBooks, canActivate: [CanActivateViaAuth]}
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule{}
