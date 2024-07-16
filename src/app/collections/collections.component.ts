import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
// import { Post, PostService } from '../post.service';
import { CommonModule, NgFor } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { Post, PostService } from '../services/post.service';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [SharedModule, CommonModule, NgFor],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.css'
})
export class CollectionsComponent implements OnInit {

  post: any;
   
  posts$!: Observable<Post[]>; 
  processedPosts: Post[] = [];
  topTwoPosts$!: Observable<Post[]>;

  constructor(private dataService: PostService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.posts$ = this.dataService.getCollections();

    this.posts$ = this.dataService.getCollections().pipe(
      map((posts ) => posts.slice(0, 3)) // Limit to maximum of 3 posts
    );

    this.topTwoPosts$ = this.posts$.pipe(
      map((posts) => posts.slice(0, 2)) // Only map the first two posts
    );
  }

}
