import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import "materialize-css";
import "angular2-materialize";
import {MaterializeModule} from "angular2-materialize";
import {InfiniteScrollModule} from "angular2-infinite-scroll";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MaterializeModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
