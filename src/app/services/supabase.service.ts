import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, PostgrestResponse } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import {  map, throwError } from 'rxjs';
import { Analytics } from './model.model';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
     this.supabase = new SupabaseClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // getAnalytics1(): Observable<any[]> {
  //   const analyticsPromise = this.supabase.from('analytics').select('*');
  //   return from(analyticsPromise.then(({ data }) => data));
  // }

  getAnalytics(): Observable<Analytics[]> {
    const analyticsPromise = this.supabase.from('analytics').select('*');
    return from(analyticsPromise.then(({ data }) => data || [])).pipe(
      map((data: any[] | null) => data || [])
    );
  }

  // Example of another method
  getLoans(): Observable<any> {
    const groupsPromise = this.supabase.from('loans').select('*');
    return from(groupsPromise.then(({ data }) => data));
  }
 


}
