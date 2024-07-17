import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsformComponent } from './analyticsform.component';

describe('AnalyticsformComponent', () => {
  let component: AnalyticsformComponent;
  let fixture: ComponentFixture<AnalyticsformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
