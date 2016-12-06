import {CanActivate} from "@angular/router";
import {Injectable} from "@angular/core";
import {Authentication} from "./Authentication";
/**
 * Created by strukov on 30.11.16.
 */
@Injectable()
export class CanActivateViaAuth implements CanActivate{
  constructor(private auth:Authentication) {}

  canActivate():boolean{
    return this.auth.isLoggedIn();
  }
}
