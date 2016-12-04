/**
 * Created by strukov on 3.12.16.
 */
import {Component, OnInit, OnDestroy} from "@angular/core";
import {BookService} from "../service/BookService";
import {Book} from "../model/Book";
import {Authentication} from "../utils/Authentication";
import {ModalBehaviour} from "./moda.directive";
import {Constants} from "../utils/Constants";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
@Component({
  selector: 'bookinfo',
  templateUrl: './bookinfo.html',
  styleUrls: ['../app.component.css']
})
export class BookInfoModal extends ModalBehaviour implements OnInit{

  public selectedBook:Book;
  public isLoading:boolean= true;
  private subscription: Subscription;

  constructor(private bookService:BookService, public auth:Authentication, private route: ActivatedRoute,
              private location:Location){
    super();
  }

  ngOnInit(): void {
    $('.modal').modal({dismissible: false});
    this.subscription = this.route.queryParams.subscribe((param:any)=>{
      this.bookService.getBookById(param['id']).subscribe(data=>this.selectedBook = data);
      this.openInfo();
    });
  }

  public addBook():void{
    this.bookService.saveBook(this.selectedBook).subscribe(()=>{
      console.log("Book saved");
    });
  }

  public onLoad():void{
    this.isLoading = false;
  }

  public openInfo():void{
    this.openModal(Constants.BookInfoModal);
  }
  public closeInfo():void{
    this.closeModal(Constants.BookInfoModal);
    this.selectedBook = null;
    this.subscription.unsubscribe();
    this.location.back();
  }
}
