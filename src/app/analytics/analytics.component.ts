import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { Analytics } from '../services/model.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/security/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReversePipe } from '../shared/reverse-pipe/reverse.pipe';
import { EditComponent } from './edit/edit.component';
import { SharedModule } from '../shared/model/shared.module';
import { AnalyticsService } from '../services/analytics/analytics.service';
@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, 
    ReversePipe, EditComponent,SharedModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements AfterViewInit {

  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _formBuilder = inject(FormBuilder);
  public AnalyticsService = inject(AnalyticsService);
  public toggleAnalytics = false;
  public userSession: string | undefined = '';
  public analytikSelected: Analytics | null = null;
  editMode: boolean = false; 

  form = this._formBuilder.group({
    yearx: this._formBuilder.control(0),
    monthx: this._formBuilder.control(''),
    collectedx: this._formBuilder.control(0),
    disbursedx: this._formBuilder.control(0),
    enforcerx: this._formBuilder.control(''),
    fotox: this._formBuilder.control(0),
    dealx: this._formBuilder.control(0),
    balance_open: this._formBuilder.control(0),
    balance_triad: this._formBuilder.control(0),
    created: this._formBuilder.control(new Date()),
    updated: this._formBuilder.control(new Date()),
    success: this._formBuilder.control(0),
    mProfited: this._formBuilder.control(0),
    mSalaries: this._formBuilder.control(0),
    profitx: this._formBuilder.control(0),
    requiredx: this._formBuilder.control(0),
    penaltyx: this._formBuilder.control(0),
    periodx: this._formBuilder.control(''),
    leaderx: this._formBuilder.control('',[Validators.required]),
  });


  async session() {
    const { data } = await this._authService.session();
    this.userSession = data.session?.user.email;
  }

  async logOut() {
    await this._authService.signOut();
    this._router.navigateByUrl('/auth/log-in');
  }
  ngAfterViewInit(): void {
    this.AnalyticsService.getAllAnalytics();
    this.session();
  }

  addAnalytics() {
    const newNote: Analytics = {
      created: new Date(), yearx: 2024, monthx: '2',
      collectedx: 1030, disbursedx: 10, leaderx: '',
      periodx: '', mProfited: 0, mSalaries: 0,
      fotox: 0, id: 0, success: 0, updated: new Date(),
    };

    this.AnalyticsService.insertAnalytics(newNote);
  }

  toggleNewAnalytics() {
    this.toggleAnalytics = !this.toggleAnalytics;
    this.form.reset();
    this.analytikSelected = null;
  }

  updateAnalytics(note: Analytics) {
    this.AnalyticsService.updateAnalytics(note);
  }

  
  newAnalytics() {
    if (this.form.invalid) {
      return;
    }
    if (this.analytikSelected) {
      this.AnalyticsService.updateAnalytics({
        id: this.analytikSelected.id,
        yearx: this.form.value.yearx ?? 0,
        monthx: this.form.value.monthx ?? '',
        collectedx: this.form.value.collectedx ?? 0,
        disbursedx: this.form.value.disbursedx ?? 0,
        success: this.form.value.success ?? 0,
        enforcerx: this.form.value.enforcerx ?? '',
        fotox: this.form.value.fotox ?? 0,
        requiredx: this.form.value.requiredx ?? 0,
        profitx: this.form.value.profitx ?? 0,
        dealx: this.form.value.dealx ?? 0,
        mProfited: this.form.value.mProfited ?? 0,
        mSalaries: this.form.value.dealx ?? 0,
        created: this.form.value.created ?? new Date(),
        updated: this.form.value.updated ?? new Date(),
      });
    } else {
      this.AnalyticsService.insertAnalytics({
        yearx: this.form.value.yearx ?? 0,
        monthx: this.form.value.monthx ?? '',
        collectedx: this.form.value.collectedx ?? 0,
        disbursedx: this.form.value.disbursedx ?? 0,
        success: this.form.value.success ?? 0,
        enforcerx: this.form.value.enforcerx ?? '',
        fotox: this.form.value.fotox ?? 0,
        requiredx: this.form.value.requiredx ?? 0,
        profitx: this.form.value.profitx ?? 0,
        dealx: this.form.value.dealx ?? 0,
        mProfited: this.form.value.mProfited ?? 0,
        mSalaries: this.form.value.dealx ?? 0,
        created: this.form.value.created ?? new Date(),
        updated: this.form.value.updated ?? new Date(),
      });

    }
    this.toggleAnalytics = !this.toggleAnalytics;
    this.form.reset();
    this.analytikSelected = null;
  }
  editAnalytics(analytikEdit: Analytics) {
    this.analytikSelected = analytikEdit;
    this.editMode = true; 
    this._router.navigate(['edit-analytics', analytikEdit.id]);
  }


  editAnalytic1(note: Analytics) {
    this.analytikSelected = note;
    this.toggleAnalytics = true;
    this.form.setValue({
      collectedx: this.analytikSelected?.collectedx ?? 0,
      periodx: this.analytikSelected?.periodx ?? '',
      yearx: this.analytikSelected?.yearx ?? 0,
      monthx: this.analytikSelected?.monthx ?? 'June',
      disbursedx: this.analytikSelected?.disbursedx ?? 0,
      enforcerx: this.analytikSelected?.enforcerx ?? '',
      leaderx: this.analytikSelected?.leaderx ?? '',
      fotox: this.analytikSelected?.fotox ?? 0,
      requiredx: this.analytikSelected?.requiredx ?? 0,
      profitx: this.analytikSelected?.profitx ?? 0,
      dealx: this.analytikSelected?.dealx ?? 0,
      penaltyx: this.analytikSelected?.penaltyx ?? 0,
      balance_open: this.analytikSelected?.balance_open ?? 0,
      balance_triad: this.analytikSelected?.balance_triad ?? 0,
      mProfited: this.analytikSelected?.mProfited ?? 0,
      mSalaries: this.analytikSelected?.mSalaries ?? 0,
      success: this.analytikSelected?.success ?? 0,
      created: this.analytikSelected?.created ?? new Date(),
      updated: this.analytikSelected?.updated ?? new Date()
    });
  }

  deleteNote(id: string) {
    this.AnalyticsService.deleteAnalytics(id);
  }

}
