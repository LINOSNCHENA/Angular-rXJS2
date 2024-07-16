import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule, NgFor } from '@angular/common';
import { map, Observable } from 'rxjs';
import { CustomersComponent } from '../customers/customers.component';
import { LoansComponent } from '../loans/loans.component';
import { CollectionsComponent } from '../collections/collections.component';
import { Post, PostService } from '../services/post.service';
import { AnalyticsComponent } from "../analytics/analytics.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgFor, SharedModule,
    LoansComponent, CollectionsComponent, CustomersComponent, AnalyticsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  post: any;
  posts$!: Observable<Post[]>;
  processedPosts: Post[] = [];
  topTwoPosts$!: Observable<Post[]>;

  constructor(private dataService: PostService) { }

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.posts$ = this.dataService.getLoans();

    this.posts$ = this.dataService.getLoans().pipe(
      map(posts => posts.slice(0, 3)) // Limit to maximum of 3 posts
    );

    this.topTwoPosts$ = this.posts$.pipe(
      map(posts => posts.slice(0, 2)) // Only map the first two posts
    );
  }
}
