import { computed, inject, Injectable, signal } from '@angular/core';
import { Analytics, AnalyticState } from '../model.model';
import { AuthService } from '../security/auth.service';
import { EnvService } from '../env/env.service';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private _supabaseClient = inject(EnvService).supabaseClient;
  private _authService = inject(AuthService);
  private _state = signal<AnalyticState>({
    notes: [],
    loading: false,
    error: false,
  });

  // selectors
  database = 'analytics';
  notes = computed(() => this._state().notes);
  loading = computed(() => this._state().loading);
  error = computed(() => this._state().error);


  async getAllAnalytics() {
    try {
      this._state.update((state) => ({
        ...state,
        loading: true,
      }));
      const {
        data: { session },
      } = await this._authService.session();
      const { data } = await this._supabaseClient
        .from(this.database)
        .select()
        // .eq('user_id', session?.user.id)
        .returns<Analytics[]>();

      if (data) {
        this._state.update((state) => ({
          ...state,
          notes: data,
        }));
      }
    } catch (error) {
      this._state.update((state) => ({
        ...state,
        error: true,
      }));
    } finally {
      this._state.update((state) => ({
        ...state,
        loading: false,
      }));
    }
  }

  async insertAnalytics(item: Analytics) {
    try {
      const {
        data: { session },
      } = await this._authService.session();
      await this._supabaseClient.from(this.database).insert({
        user_id: session?.user.id,
        created: item.created, yearx: item.yearx,
        monthx: item.monthx, collectedx: item.collectedx,
        disbursedx: item.disbursedx,
        leaderx: '', updated: item.updated,
        periodx: '', mProfited: 0, mSalaries: 0, fotox: 0,
        id: 0, success: 0
      });

      this.getAllAnalytics();
    } catch (error) {
      this._state.update((state) => ({
        ...state,
        error: true,
      }));
    }
  }

  async updateAnalytics(note: Analytics) {
    try {
      await this._supabaseClient
        .from(this.database)
        .update({
          ...note,
        })
        .eq('id', note.id);

      this.getAllAnalytics();
    } catch (error) {
      this._state.update((state) => ({
        ...state,
        error: true,
      }));
    }
  }

  async deleteAnalytics(id: string) {
    try {
      await this._supabaseClient.from(this.database).delete().eq('id', id);
      this.getAllAnalytics();
    } catch (error) {
      this._state.update((state) => ({
        ...state,
        error: true,
      }));
    }
  }

  async getAnalyticsById(id: number): Promise<any> {
    const lists = await this._supabaseClient
      .from(this.database)
      .select('*')
      .eq('list_id', id)
      .order('position');

    return lists.data || [];
  }


}
