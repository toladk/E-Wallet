import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranxsetpasswordComponent } from './tranxsetpassword.component';

describe('TranxsetpasswordComponent', () => {
  let component: TranxsetpasswordComponent;
  let fixture: ComponentFixture<TranxsetpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranxsetpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranxsetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
