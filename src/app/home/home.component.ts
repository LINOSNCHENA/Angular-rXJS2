import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/model/shared.module';
import { CommonModule, NgFor } from '@angular/common';
import { map, Observable } from 'rxjs';
import { CustomersComponent } from '../customers/customers.component';
import { LoansComponent } from '../loans/loans.component';
import { CollectionsComponent } from '../collections/collections.component';
import { PostService } from '../services/post.service';
import { AnalyticsComponent } from "../analytics/analytics.component";
import { Post } from '../services/model.model';

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
  sessionUser: any;

  constructor(private dataService: PostService) { }

  ngOnInit() {
    this.fetchPosts();
    const storedSessionData = localStorage.getItem('sessionData');
    this.sessionUser=String(storedSessionData)
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
