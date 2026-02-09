import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-policy',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-policy.html',
  styleUrl: './create-policy.css'
})
export class CreatePolicyComponent {

  policyName = '';
  policyType = 'HEALTH';

  premium: number | null = null;
  durationYears: number | null = null;
  description = '';

  message = '';
  success = false;
  loading = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  createPolicy() {
    this.message = '';
    this.success = false;

    if (this.premium === null || this.premium <= 0) {
      this.message = '❌ Premium amount must be a positive number';
      return;
    }

    if (this.durationYears === null || this.durationYears < 1) {
      this.message = '❌ Duration must be at least 1 year';
      return;
    }

    this.loading = true;

    const payload = {
      policyName: this.policyName,
      policyType: this.policyType,
      premiumAmount: this.premium,
      duration: this.durationYears,
      description: this.description
    };

    this.http.post(
      'http://localhost:7071/api/admin/policies',
      payload,
      { responseType: 'text' }
    ).subscribe({
      next: () => {
        // 🚀 INSTANT FEEDBACK
        this.loading = false;
        this.success = true;
        this.message = '✅ Policy created successfully';

        // auto-hide toast
        setTimeout(() => this.message = '', 3000);

        // silent redirect
        setTimeout(() => {
          this.router.navigate(['/admin/policies'], {
            queryParams: { created: true }
          });
        }, 1200);
      },
      error: () => {
        this.loading = false;
        this.success = false;
        this.message = '❌ Error creating policy';
      }
    });
  }
}
