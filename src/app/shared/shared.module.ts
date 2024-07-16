import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from '../services/post.service';

@NgModule({
  declarations: [],
  imports: [HttpClientModule, CommonModule],
  exports: [HttpClientModule, CommonModule],
  providers: [PostService],

})
export class SharedModule { }
