import { inject, Injectable } from '@angular/core';
import { SignUpWithPasswordCredentials } from '@supabase/supabase-js';
import { EnvService } from '../env/env.service';
import { from, map, Observable } from 'rxjs';
import { SessionData } from '../model.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _supabaseClient = inject(EnvService).supabaseClient;

  session() {
    let x = this._supabaseClient.auth.getSession();
    console.log(x);
    return x;
  }

  session2(): Observable<any> {
    const sessionPromise = this._supabaseClient.auth.getSession();
    console.log(sessionPromise); // This will log the promise object
    return from(sessionPromise);
  }

  sigUp(credentials: SignUpWithPasswordCredentials) {
    return this._supabaseClient.auth.signUp(credentials);
  }

  logIn(credentials: SignUpWithPasswordCredentials) {
    console.log("==============|AUTH|===================");
    console.log(credentials)
    return this._supabaseClient.auth.signInWithPassword(credentials);
  }

  signOut() {
    return this._supabaseClient.auth.signOut();
  }

  signInWithPassword(email: string, password: string) {
    console.log(email, '|india|', password)
    console.log("====|Backend-Sign|===========")
    return this._supabaseClient.auth.signInWithPassword({ email, password })
  }

  session3(): Observable<SessionData> {
    const sessionPromise = this._supabaseClient.auth.getSession();
    console.log(sessionPromise); // This will log the promise object
    return from(sessionPromise).pipe(
      map(response => {
        const data = response.data.session;
        localStorage.setItem('sessionData', JSON.stringify({ data }))
        return {
          session: {
            access_token: data?.access_token || '',
            token_type: data?.token_type || '',
            expires_in: data?.expires_in || 0,
            expires_at: data?.expires_at || 0,
            refresh_token: data?.refresh_token || '',
            user: {
              id: data?.user.id || '',
              aud: data?.user.aud || '',
              role: data?.user.role || '',
              email: data?.user.email || '',
              email_confirmed_at: data?.user.email_confirmed_at || '',
              invited_at: data?.user.invited_at || '',
              phone: data?.user.phone || '',
              confirmation_sent_at: data?.user.confirmation_sent_at || '',
              confirmed_at: data?.user.confirmed_at || '',
              last_sign_in_at: data?.user.last_sign_in_at || '',
              app_metadata: data?.user.app_metadata || {},
              user_metadata: data?.user.user_metadata || {},
              identities: data?.user.identities?.map((identity: any) => ({
                identity_id: identity.identity_id || '',
                id: identity.id || '',
                user_id: identity.user_id || '',
                identity_data: identity.identity_data || {},
                provider: identity.provider || '',
                last_sign_in_at: identity.last_sign_in_at || '',
                created_at: identity.created_at || '',
                updated_at: identity.updated_at || '',
                email: identity.email || ''
              })) || [],
              created_at: data?.user.created_at || '',
              updated_at: data?.user.updated_at || '',
              is_anonymous: data?.user.is_anonymous || false
            }
          },
          error: response.error
        };
      })
    );

  }

  // Optional: Retrieve session data from localStorage
  getSessionDataFromLocalStorage(): SessionData | null {
    const storedSessionData = localStorage.getItem('sessionData');
    return storedSessionData ? JSON.parse(storedSessionData) : null;
  }

  clearSessionData(): void {
    localStorage.removeItem('sessionData');
  }



}

