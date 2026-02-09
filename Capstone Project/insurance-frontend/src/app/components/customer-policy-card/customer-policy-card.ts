import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-policy-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-policy-card.html',
  styleUrl: './customer-policy-card.css'
})
export class CustomerPolicyCardComponent {

  @Input() policy: any;
  @Input() applied = false;

  @Output() apply = new EventEmitter<number>();

  applyPolicy() {
    this.apply.emit(this.policy.policyId);
  }
}
