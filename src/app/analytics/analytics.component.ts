import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { SharedModule } from '../shared/shared.module';
import { CommonModule, NgFor } from '@angular/common';
import { Observable } from 'rxjs';
import { Analytics } from '../services/model.model';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [SharedModule, CommonModule, NgFor],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']  // Fixed styleUrls typo
})

export class AnalyticsComponent implements OnInit {
  analyticsData$!: Observable<Analytics[]>;
  analyticsData!: Observable<Analytics[]>;
  loading = false;
  error: string | null = null;
  constructor(private supabaseService: SupabaseService) { }

  ngOnInit(): void {
    this.fetchAnalytics();
  }

  fetchAnalytics(): void {
    this.loading = true;
    this.analyticsData$ = this.supabaseService.getAnalytics();

    // Subscribe if you need side-effects like setting loading or handling errors
    this.analyticsData$.subscribe({
      next: () => this.loading = false,
      error: (err: any) => {
        this.error = err.message || 'Something went wrong; please try again later.';
        this.loading = false;
      }
    });

      // Subscribe if you need side-effects like setting loading or handling errors
      this.analyticsData.subscribe({
        next: () => this.loading = false,
        error: (err: any) => {
          this.error = err.message || 'Something went wrong; please try again later.';
          this.loading = false;
        }
      });
  }
}
