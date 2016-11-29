/**
 * Created by strukov on 15.11.16.
 */
export class Constants{
  private static get API_URL():string {return 'http://localhost:8080'}
  public static get GoogleAPI():string {return 'https://www.googleapis.com/books/v1/volumes'}
  public static get OAuthURL():string {return this.API_URL + '/oauth/token'}
  public static get LogoutURL():string {return this.API_URL + '/api/v1/logout'}
  public static get LoggedInUser():string{return this.API_URL + '/api/v1/me'}
  public static get Register():string{return this.API_URL + '/api/v1/register'}
  public static get Books():string{return this.API_URL + '/api/v1/books'}
  public static get API_KEY():string {return 'AIzaSyBfeYjfXYq_kccfOb-wRPnRw5f_ED5hpaA'}
}
