import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CustomerProfileComponent } from '../customer-profile/customer-profile';
import { CustomerPoliciesComponent } from '../customer-policies/customer-policies';

type ViewType = 'NONE' | 'PROFILE' | 'ALL' | 'REQUESTED' | 'MY';
type PolicyView = 'ALL' | 'REQUESTED' | 'MY';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CustomerProfileComponent,
    CustomerPoliciesComponent
  ],
  templateUrl: './customer-dashboard.html',
  styleUrl: './customer-dashboard.css'
})
export class CustomerDashboardComponent {

  username = localStorage.getItem('username') ?? 'User';
  activeView: ViewType = 'NONE';

  constructor(private router: Router) {}

  // 👤 Toggle profile
  toggleProfile() {
    this.activeView =
      this.activeView === 'PROFILE' ? 'NONE' : 'PROFILE';
  }

  // 📦 Open policy cards
  openBox(view: PolicyView) {
    this.activeView = view;
  }

  // ✅ SAFE getter for policies component
  get policyView(): PolicyView {
    return this.activeView as PolicyView;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
