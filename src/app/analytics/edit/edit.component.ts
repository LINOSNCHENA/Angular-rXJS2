import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { Analytics } from '../../services/model.model';
import { SharedModule } from '../../shared/model/shared.module';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule,SharedModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  analyticsForm: FormGroup;
  analytic1: Analytics = {
    created: new Date(),
    fotox: 0,
    mProfited: 0,
    mSalaries: 0,
    success: 0
  };
  analytics: any;
  @Input() analytikEdit: any; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private analyticsService: AnalyticsService,
    private fb: FormBuilder
  ) {
    this.analyticsForm = this.fb.group({
      created: [this.analytic1.created, Validators.required],
      fotox: [this.analytic1.fotox, Validators.required],
      mProfited: [this.analytic1.mProfited, Validators.required],
      mSalaries: [this.analytic1.mSalaries, Validators.required],
      success: [this.analytic1.success, Validators.required]
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.analytikEdit = this.analyticsService.getAnalyticsById(id);
      this.analytics = this.analytikEdit;
      this.analytics = this.analyticsService.getAnalyticsById(1);

      // Update form values with the loaded analytics data
      this.analyticsForm.patchValue({
        created: this.analytics.created,
        fotox: this.analytics.fotox,
        mProfited: this.analytics.mProfited,
        mSalaries: this.analytics.mSalaries,
        success: this.analytics.success
      });
    }
  }

  saveChanges() {
    if (this.analyticsForm.valid) {
      this.analyticsService.updateAnalytics(this.analyticsForm.value);
      this.router.navigate(['/']);
    }
  }
}
