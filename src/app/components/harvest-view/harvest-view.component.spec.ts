import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarvestViewComponent } from './harvest-view.component';

describe('HarvestViewComponent', () => {
  let component: HarvestViewComponent;
  let fixture: ComponentFixture<HarvestViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HarvestViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HarvestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
