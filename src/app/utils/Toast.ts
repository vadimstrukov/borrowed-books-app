/**
 * Created by strukov on 28.12.16.
 */
export class Toast {

  public static getToast(message: string) {
    return Materialize.toast(message, 3000, 'rounded');
  }
}
