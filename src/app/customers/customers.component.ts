import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post, PostService } from '../post.service';
import { HomeComponent } from '../home/home.component';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [HomeComponent,CommonModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {

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

    this.posts$ = this.dataService.getPosts().pipe(
      map((posts ) => posts.slice(0, 3)) // Limit to maximum of 3 posts
    );

    this.topTwoPosts$ = this.posts$.pipe(
      map((posts) => posts.slice(0, 2)) // Only map the first two posts
    );
  }

}
