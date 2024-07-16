import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post, PostService } from '../post.service';
import { SharedModule } from '../shared/shared.module';
import { AppComponent } from '../app.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [SharedModule, AppComponent, HomeComponent],
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
    this.topTwoPosts$ = this.posts$.pipe(
      map(posts => posts.slice(0, 2)) // Only map the first two posts
    );
  }

}
