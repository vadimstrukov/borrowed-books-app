/**
 * Created by strukov on 30.11.16.
 */
import {Component, OnInit} from "@angular/core";
import {BookService} from "../service/BookService";
import {OwnedBook} from "../model/OwnedBook";

@Component({
  templateUrl: './userbooks.html',
  styleUrls: ['../app.component.scss']
})

export class UserBooks implements OnInit{
  userBooks:Array<OwnedBook>;

  constructor(private bookService:BookService){}

  ngOnInit():void{
    this.bookService.getUserBooks().subscribe(data=>this.userBooks = data);
  }
}
