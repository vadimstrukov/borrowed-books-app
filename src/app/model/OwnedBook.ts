import {Book} from "./Book";
/**
 * Created by strukov on 30.11.16.
 */
export class OwnedBook {
  id?: number;
  readStatus: string;
  date_added: Date;
  borrowed: boolean;
  book: Book;
}
