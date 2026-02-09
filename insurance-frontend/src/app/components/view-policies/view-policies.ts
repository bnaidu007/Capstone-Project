import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyService } from '../../services/policy';

@Component({
  selector: 'app-view-policies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-policies.html',
  styleUrl: './view-policies.css'
})
export class ViewPoliciesComponent implements OnInit {

  policies: any[] = [];
  loading = true;
  error = '';

  constructor(private policyService: PolicyService) {}

  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies() {
    this.loading = true;

    this.policyService.getAllPolicies().subscribe({
      next: (data) => {
        this.policies = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load policies';
        this.loading = false;
      }
    });
  }

  deletePolicy(id: number) {
    const confirmDelete = confirm('Are you sure you want to delete this policy?');

    if (!confirmDelete) return;

    this.policyService.deletePolicy(id).subscribe({
      next: () => {
        alert('Policy deleted successfully');
        this.loadPolicies(); // refresh list
      },
      error: () => alert('Failed to delete policy')
    });
  }
}
