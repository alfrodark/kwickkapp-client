import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingDeleteDialogComponent } from './billing-delete-dialog.component';

describe('BillingDeleteDialogComponent', () => {
  let component: BillingDeleteDialogComponent;
  let fixture: ComponentFixture<BillingDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillingDeleteDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BillingDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
