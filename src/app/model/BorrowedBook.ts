import {OwnedBook} from "./OwnedBook";
/**
 * Created by strukov on 23.12.16.
 */
export class BorrowedBook {
  id?: number;
  ownedBook: OwnedBook;
  borrowDate: Date;
  returnDate: Date;
  borrowDescription: string;
}
