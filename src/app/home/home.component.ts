import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import {  Post, PostService } from '../post.service';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AppComponent,SharedModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
// export class HomeComponent {
  export class HomeComponent implements OnInit {
  post: any;
   
  posts$!: Observable<Post[]>; // Observable of an array of posts
  processedPosts: Post[] = [];
  topTwoPosts$!: Observable<Post[]>;

  constructor(private dataService: PostService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.posts$ = this.dataService.getPosts();
    this.topTwoPosts$ = this.posts$.pipe(
      map(posts => posts.slice(0, 2)) // Only map the first two posts
    );
  }


}
