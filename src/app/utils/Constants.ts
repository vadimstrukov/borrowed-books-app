/**
 * Created by strukov on 15.11.16.
 */
export class Constants{
  public static get GoogleAPI():string {return 'https://www.googleapis.com/books/v1/volumes'}
  public static get OAuthURL():string {return 'http://192.168.0.101:8080/oauth/token'}
  public static get LogoutURL():string {return 'http://localhost:8080/api/v1/logout'}
  public static get LoggedInUser():string{return 'http://192.168.0.101:8080/api/v1/me'}
  public static get API_KEY():string {return 'AIzaSyBfeYjfXYq_kccfOb-wRPnRw5f_ED5hpaA'}
}
