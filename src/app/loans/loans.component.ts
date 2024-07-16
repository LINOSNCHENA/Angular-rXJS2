import { Component } from '@angular/core';
import { Post, PostService } from '../post.service';
import { map, Observable } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [CommonModule, NgFor, SharedModule],
  templateUrl: './loans.component.html',
  styleUrl: './loans.component.css'
})
export class LoansComponent {

  post: any;   
  posts$!: Observable<Post[]>; 
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
