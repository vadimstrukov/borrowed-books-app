import {Component, OnInit} from '@angular/core';
import {BookItems} from "./model/BookItems";
import {BookService} from "./service/BookService";
import {FormControl} from "@angular/forms";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BookService]
})
export class AppComponent implements OnInit{
  books: BookItems;
  searchControl = new FormControl();


  constructor(private bookService: BookService){

    this.searchControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe((value : string) => {
        bookService.startIndex = 1;
        if(value!="")
          bookService.getBooksByTitle(value).subscribe(data => this.books = data);
        else
          this.books.items.length = 0;
      });
  }

  ngOnInit(){
    $('.button-collapse').sideNav();
  }

  scrollWindowToTop(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }

  clearSearchBox(){
    this.searchControl.setValue("");
  }

  onScroll(){
    this.bookService.startIndex += 10;
    this.bookService.getBooksByTitle(this.searchControl.value).subscribe(data => {
      for(let book of data.items)
        this.books.items.push(book);
    });
  }



}
