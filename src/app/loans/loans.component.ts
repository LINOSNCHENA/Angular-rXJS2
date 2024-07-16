import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PostService } from '../services/post.service';
import { Post } from '../services/model.model';

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
    this.posts$ = this.dataService.getLoans();

    this.posts$ = this.dataService.getLoans().pipe(
      map((posts ) => posts.slice(0, 3)) 
    );
    this.topTwoPosts$ = this.posts$.pipe(
      map((posts) => posts.slice(0, 2)) // Only map the first two posts
    );
  }

}
