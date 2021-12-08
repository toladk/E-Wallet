import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundwithdrawalComponent } from './fundwithdrawal.component';

describe('FundwithdrawalComponent', () => {
  let component: FundwithdrawalComponent;
  let fixture: ComponentFixture<FundwithdrawalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundwithdrawalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundwithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
