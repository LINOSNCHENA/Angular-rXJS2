import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { Post, PostService } from '../post.service';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [HomeComponent,CommonModule],
  templateUrl: './loans.component.html',
  styleUrl: './loans.component.css'
})
export class LoansComponent {

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
