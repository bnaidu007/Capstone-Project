import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPolicyCard } from './customer-policy-card';

describe('CustomerPolicyCard', () => {
  let component: CustomerPolicyCard;
  let fixture: ComponentFixture<CustomerPolicyCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerPolicyCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerPolicyCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
