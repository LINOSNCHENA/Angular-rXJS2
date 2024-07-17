import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsFormComponent } from './analytics-form.component';

describe('AnalyticsFormComponent', () => {
  let component: AnalyticsFormComponent;
  let fixture: ComponentFixture<AnalyticsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
