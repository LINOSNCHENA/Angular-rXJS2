import { Component, OnInit } from '@angular/core';
import { Post, PostService } from '../post.service';
import { SharedModule } from '../shared/shared.module';
import { CommonModule, NgFor } from '@angular/common';
import { map, Observable } from 'rxjs';
import { CustomersComponent } from '../customers/customers.component';
import { LoansComponent } from '../loans/loans.component';
import { CollectionsComponent } from '../collections/collections.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgFor,SharedModule, LoansComponent,
    CollectionsComponent,
    CustomersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  post: any;

  posts$!: Observable<Post[]>; // Observable of an array of posts
  processedPosts: Post[] = [];
  topTwoPosts$!: Observable<Post[]>;

  constructor(private dataService: PostService) { }

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.posts$ = this.dataService.getPosts();

    this.posts$ = this.dataService.getPosts().pipe(
      map(posts => posts.slice(0, 3)) // Limit to maximum of 3 posts
    );

    this.topTwoPosts$ = this.posts$.pipe(
      map(posts => posts.slice(0, 2)) // Only map the first two posts
    );
  }
}
