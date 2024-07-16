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
  private readonly API_URL = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private httpClient: HttpClient) { }

  
  getCustomers() : Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.API_URL).pipe(
      catchError(this.handleError)
    );
  }
  getLoans(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.API_URL).pipe(
      catchError(this.handleError)
    );
  }
  getCollections(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.API_URL).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
