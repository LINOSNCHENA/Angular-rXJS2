import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { SharedModule } from '../shared/model/shared.module';
import { PostService } from '../services/post.service';
import { Post } from '../services/model.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [SharedModule, CommonModule, NgFor],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
  post: any;   
  posts$!: Observable<Post[]>; 
  processedPosts: Post[] = [];
  topTwoPosts$!: Observable<Post[]>;

  constructor(private dataService: PostService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.posts$ = this.dataService.getCustomers();

    this.posts$ = this.dataService.getCustomers().pipe(
      map((posts ) => posts.slice(0, 3)) // Limit to maximum of 3 posts
    );

    this.topTwoPosts$ = this.posts$.pipe(
      map((posts) => posts.slice(0, 2)) // Only map the first two posts
    );
  }

}
