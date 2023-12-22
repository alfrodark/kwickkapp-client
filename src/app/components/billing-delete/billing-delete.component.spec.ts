import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingDeleteComponent } from './billing-delete.component';

describe('BillingDeleteComponent', () => {
  let component: BillingDeleteComponent;
  let fixture: ComponentFixture<BillingDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillingDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BillingDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
