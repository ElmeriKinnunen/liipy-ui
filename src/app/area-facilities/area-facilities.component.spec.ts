import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaFacilitiesComponent } from './area-facilities.component';

describe('AreaFacilitiesComponent', () => {
  let component: AreaFacilitiesComponent;
  let fixture: ComponentFixture<AreaFacilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaFacilitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaFacilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
