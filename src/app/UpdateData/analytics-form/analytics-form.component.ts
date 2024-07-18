import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../shared/model/shared.module';

export interface Analytics {
    id: number;
    created: Date;
    yearx?: number;
    monthx?: string;
    collectedx?: number;
    disbursedx?: number;
    updated?: Date;
    enforcerx?: string;
    leaderx?: string;
    fotox: number;
    requiredx?: number;
    profitx?: number;
    dealx?: number;
    periodx?: string;
    penaltyx?: number;
    balance_open?: number;
    balance_triad?: number;
    mProfited: number;
    mSalaries: number;
    success: number;
}

@Component({
  selector: 'app-analytics-form',
  standalone: true,
  imports: [CommonModule,NgFor,NgIf,FormsModule,ReactiveFormsModule, SharedModule],
  templateUrl: './analytics-form.component.html',
  styleUrl: './analytics-form.component.css'
})
export class AnalyticsFormComponent implements OnInit {
  analyticsForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.analyticsForm = this.fb.group({
      id: [0, Validators.required],
      created: ['', Validators.required],
      yearx: [''],
      monthx: [''],
      collectedx: [''],
      disbursedx: [''],
      updated: [''],
      enforcerx: [''],
      leaderx: [''],
      fotox: [0, Validators.required],
      requiredx: [''],
      profitx: [''],
      dealx: [''],
      periodx: [''],
      penaltyx: [''],
      balance_open: [''],
      balance_triad: [''],
      mProfited: [0, Validators.required],
      mSalaries: [0, Validators.required],
      success: [0, Validators.required]
    });

    this.loadDataForUpdate();
  }

  loadDataForUpdate() {
    const existingData: Analytics = {
      id: 1,
      created: new Date(),
      yearx: 2023,
      monthx: 'July',
      collectedx: 10000,
      disbursedx: 5000,
      updated: new Date(),
      enforcerx: 'John Doe',
      leaderx: 'Jane Smith',
      fotox: 20,
      requiredx: 15000,
      profitx: 5000,
      dealx: 3,
      periodx: 'Monthly',
      penaltyx: 100,
      balance_open: 2000,
      balance_triad: 3000,
      mProfited: 7000,
      mSalaries: 3000,
      success: 1
    };

    this.analyticsForm.patchValue(existingData);
  }

  onSubmit(): void {
    if (this.analyticsForm.valid) {
      console.log(this.analyticsForm.value);
    }
  }
}

