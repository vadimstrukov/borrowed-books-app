/**
 * Created by strukov on 15.11.16.
 */
export class Constants {
  private static get API_URL(): string {
    return 'https://books.strukov.eu/restful/borrowed'
  }

  public static get LibraryLength(): string {
    return this.API_URL + '/api/v1/books/count'
  }

  public static get GoogleAPI(): string {
    return 'https://www.googleapis.com/books/v1/volumes'
  }

  public static get OAuthURL(): string {
    return this.API_URL + '/oauth/token'
  }

  public static get LogoutURL(): string {
    return this.API_URL + '/api/v1/user/logout'
  }

  public static get LoggedInUser(): string {
    return this.API_URL + '/api/v1/user/me'
  }

  public static get Register(): string {
    return this.API_URL + '/api/v1/register'
  }

  public static get OwnedBooks(): string {
    return this.API_URL + '/api/v1/books/owned'
  }

  public static get BorrowedBooks(): string {
    return this.API_URL + '/api/v1/books/borrowed'
  }

  public static get API_KEY(): string {
    return 'AIzaSyBfeYjfXYq_kccfOb-wRPnRw5f_ED5hpaA'
  }

  public static get CheckOwnedBook(): string {
    return this.API_URL + '/api/v1/books/owned/check'
  }

  public static get LoginModal(): JQuery {
    return $('#login')
  }

  public static get BookInfoModal(): JQuery {
    return $('#bookinfo')
  }

  public static get BorrowBookModal(): JQuery {
    return $('#borrowbook')
  }

}
