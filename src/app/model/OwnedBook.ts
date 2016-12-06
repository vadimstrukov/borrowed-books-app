import {Book} from "./Book";
import {User} from "./User";
/**
 * Created by strukov on 30.11.16.
 */
export class OwnedBook {
  readStatus:string;
  date_added:Date;
  book:Book;
  user:User;
}
