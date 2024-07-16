import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

export interface Post {
  slice(arg0: number, arg1: number): any;
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private clients = 1;
  private readonly API_URL1 = 'https://jsonplaceholder.typicode.com/posts'; // + this.clients;
  private readonly API_URL2 = 'https://jsonplaceholder.typicode.com/posts';
  private readonly API_URL3 = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private httpClient: HttpClient) { }


  getCustomers(): Observable<Post[]> {
    console.log(this.clients);
    console.log(this.API_URL1);
    console.log(this.API_URL2);
    console.log(this.API_URL3);
    return this.httpClient.get<Post[]>(this.API_URL1).pipe(
      catchError(this.handleError)
    );
  }
  getLoans(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.API_URL2).pipe(
      catchError(this.handleError)
    );
  }
  getCollections(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.API_URL3).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
