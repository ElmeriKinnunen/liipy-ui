import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFacilitiesComponent } from './user-facilities.component';

describe('UserFacilitiesComponent', () => {
  let component: UserFacilitiesComponent;
  let fixture: ComponentFixture<UserFacilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFacilitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFacilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
