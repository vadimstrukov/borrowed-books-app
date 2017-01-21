import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {Authentication} from "../service/AuthService";
/**
 * Created by strukov on 30.11.16.
 */
@Injectable()
export class CanActivateViaAuth implements CanActivate {
  constructor(private auth: Authentication, private router:Router) {
  }

  canActivate(): boolean {
    if(this.auth.isLoggedIn())
      return true;
    else {
      this.router.navigate(['/search']);
      return false;
    }
  }
}
