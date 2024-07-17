import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SupabaseClient, PostgrestResponse } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Observable, from, throwError, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private supabase: SupabaseClient;

  constructor(private http: HttpClient) {
    this.supabase = new SupabaseClient(environment.supabaseUrl, environment.supabaseKey);
  }

  getAnalyticsData(): Observable<any[]> {
    const lockName = 'lock:sb-yjzksbhfhasewiftovmb-auth-token';

    return from(this.acquireLock(lockName)).pipe(
      switchMap(lock => {
        if (!lock) {
          return throwError('Failed to acquire lock');
        }
        return this.fetchAnalyticsData().pipe(
          catchError(error => {
            console.error('Error fetching data from Supabase:', error);
            return throwError('Error fetching data from Supabase');
          }),
          tap(() => this.releaseLock(lock)), // Release lock after data fetched
          catchError(error => {
            console.error('Error releasing lock:', error);
            return throwError('Error releasing lock');
          })
        );
      }),
      catchError(error => {
        console.error('Error acquiring lock:', error);
        return throwError('Error acquiring lock');
      })
    );
  }

  private async acquireLock(lockName: string): Promise<any> {
    try {
      return await new Promise((resolve, reject) => {
        navigator.locks.request(lockName, (lock: any) => {
          if (lock) {
            resolve(lock);
          } else {
            reject('Failed to acquire lock');
          }
        });
      });
    } catch (error) {
      console.error('Failed to acquire lock:', error);
      return null;
    }
  }

  private async releaseLock(lock: any): Promise<void> {
    try {
      await lock?.unlock();
    } catch (error) {
      console.error('Failed to release lock:', error);
    }
  }


  private fetchAnalyticsData(): Observable<any[]> {
    return from(this.supabase.from('analytics').select('*')).pipe(
      switchMap((response: PostgrestResponse<any>) => {
        return response.data ? of(response.data) : of([]);
      }),
      catchError(error => {
        console.error('Error processing data:', error);
        return throwError('Error processing data');
      })
    );
  }



}
