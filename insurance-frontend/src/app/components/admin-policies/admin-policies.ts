import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-policies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-policies.html',
  styleUrl: './admin-policies.css'
})
export class AdminPoliciesComponent implements OnInit {

  // 🔥 IMPORTANT: TWO ARRAYS
  allPolicies: any[] = [];     // original data from backend
  policies: any[] = [];        // data shown in UI

  loading = true;
  error = '';
  successMessage = '';

  searchText = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    // success message after create
    this.route.queryParams.subscribe(params => {
      if (params['created']) {
        this.successMessage = '✅ Policy created successfully';
        setTimeout(() => this.successMessage = '', 3000);
      }
    });

    this.loadPolicies();
  }

  loadPolicies() {
    this.loading = true;

    this.http.get<any[]>('http://localhost:7071/api/admin/policies')
      .subscribe({
        next: (data) => {
          console.log('Policies from backend:', data);

          // 🔥 STORE ORIGINAL DATA
          this.allPolicies = data;

          // 🔥 SHOW ALL POLICIES BY DEFAULT
          this.policies = [...data];

          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load policies';
          this.loading = false;
        }
      });
  }

  // 🔍 FRONTEND SEARCH (SAFE)
  searchPolicies() {
    const keyword = this.searchText.toLowerCase().trim();

    if (!keyword) {
      // reset to all policies
      this.policies = [...this.allPolicies];
      return;
    }

    this.policies = this.allPolicies.filter(p =>
      p.policyName.toLowerCase().includes(keyword) ||
      (p.policyType && p.policyType.toLowerCase().includes(keyword))
    );
  }

  deletePolicy(id: number) {
    if (!confirm('Are you sure you want to delete this policy?')) return;

    this.http.delete(
      `http://localhost:7071/api/admin/policies/${id}`,
      { responseType: 'text' }   
    )
      .subscribe({
        next: () => {
          this.successMessage = '✅ Policy deleted successfully';

          
          this.allPolicies = this.allPolicies.filter(p => p.policyId !== id);
          this.policies = this.policies.filter(p => p.policyId !== id);

          setTimeout(() => this.successMessage = '', 3000);
        },
        error: () => {
          this.error = 'Failed to delete policy';
        }
      });
  }
}
