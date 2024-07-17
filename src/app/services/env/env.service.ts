import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = new SupabaseClient(environment.supabaseUrl, 
      environment.supabaseKey);
  }
}
