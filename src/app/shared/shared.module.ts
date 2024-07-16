import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoansComponent } from '../loans/loans.component';
import { CustomersComponent } from '../customers/customers.component';
import { CollectionsComponent } from '../collections/collections.component';
import { HomeComponent } from '../home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { PostService } from '../post.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,LoansComponent,CustomersComponent,CollectionsComponent,HomeComponent, HttpClientModule
  ],
  exports: [
    HttpClientModule
],

providers: [PostService],
bootstrap: [AppComponent]
})
export class SharedModule { }
