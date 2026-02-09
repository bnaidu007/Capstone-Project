import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CustomerPolicyCardComponent } from '../customer-policy-card/customer-policy-card';
import { PolicyService } from '../../services/policy';

@Component({
  selector: 'app-customer-policies',
  standalone: true,
  imports: [CommonModule, CustomerPolicyCardComponent],
  templateUrl: './customer-policies.html',
  styleUrl: './customer-policies.css'
})
export class CustomerPoliciesComponent implements OnInit, OnChanges {

  @Input() view!: 'ALL' | 'REQUESTED' | 'MY';

  policies: any[] = [];          // ALL policies
  myPolicies: any[] = [];        // REQUESTED (PENDING / REJECTED)
  approvedPolicies: any[] = [];  // MY (APPROVED) ✅ ADDED

  username = localStorage.getItem('username');
  isAdmin = false;

  message = '';

  constructor(
    private http: HttpClient,
    private policyService: PolicyService
  ) {}

  ngOnInit(): void {
    this.loadPolicies();
  }

  // ✅ reload when tab changes
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['view']) {
      this.message = '';
      this.loadPolicies();
    }
  }

  loadPolicies() {

    // ================= ALL POLICIES =================
    this.http
      .get<any[]>('http://localhost:7071/api/customer/policies')
      .subscribe(d => this.policies = d);

    // ================= REQUESTED (PENDING / REJECTED) =================
    this.policyService
      .getPendingPolicies(this.username!)
      .subscribe(d => this.myPolicies = d);

    // ================= MY POLICIES (APPROVED) =================
    this.policyService
      .getApprovedPolicies(this.username!)
      .subscribe(d => this.approvedPolicies = d);
  }

  alreadyApplied(policyId: number): boolean {
    return (
      this.myPolicies.some(mp => mp.policy.policyId === policyId) ||
      this.approvedPolicies.some(ap => ap.policy.policyId === policyId)
    );
  }

  applyPolicy(policyId: number) {

    this.message = '✅ Policy applied successfully. Awaiting approval';

    // optimistic UI
    this.myPolicies.push({
      policy: { policyId },
      status: 'PENDING'
    });

    this.http.post(
      `http://localhost:7071/api/customer/apply?username=${this.username}&policyId=${policyId}`,
      {}
    ).subscribe({
      next: () => {
        setTimeout(() => this.message = '', 3000);
      },
      error: () => {
        this.message = '❌ Failed to apply policy';
        this.myPolicies = this.myPolicies.filter(
          mp => mp.policy.policyId !== policyId
        );
      }
    });
  }
}
