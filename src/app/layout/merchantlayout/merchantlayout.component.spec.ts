import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantlayoutComponent } from './merchantlayout.component';

describe('MerchantlayoutComponent', () => {
  let component: MerchantlayoutComponent;
  let fixture: ComponentFixture<MerchantlayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantlayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
