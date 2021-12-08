import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranxsettranspasswordComponent } from './tranxsettranspassword.component';

describe('TranxsettranspasswordComponent', () => {
  let component: TranxsettranspasswordComponent;
  let fixture: ComponentFixture<TranxsettranspasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranxsettranspasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranxsettranspasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
