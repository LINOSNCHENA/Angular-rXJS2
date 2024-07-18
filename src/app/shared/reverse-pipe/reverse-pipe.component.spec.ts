import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReversePipeComponent } from './reverse-pipe.component';

describe('ReversePipeComponent', () => {
  let component: ReversePipeComponent;
  let fixture: ComponentFixture<ReversePipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReversePipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReversePipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
