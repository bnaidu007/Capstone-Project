import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-requests.html',
  styleUrl: './admin-requests.css'
})
export class AdminRequestsComponent implements OnInit {

  requests: any[] = [];
  loading = false;
  error = '';
  message = '';

 
  processingIds = new Set<number>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests() {
    this.loading = true;
    this.error = '';

    this.http
      .get<any[]>('http://localhost:7071/api/admin/pending-requests')
      .subscribe({
        next: (data) => {
          this.requests = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load requests';
          this.loading = false;
        }
      });
  }

  approve(id: number) {
    this.updateStatus(id, 'APPROVED');
  }

  reject(id: number) {
    this.updateStatus(id, 'REJECTED');
  }

  //  FAST + SAFE
  updateStatus(customerPolicyId: number, status: 'APPROVED' | 'REJECTED') {

    // Prevent re-click / already processed
    if (this.processingIds.has(customerPolicyId)) {
      return;
    }

    this.processingIds.add(customerPolicyId);
    this.error = '';

    // ✅ Show message instantly
    this.message =
      status === 'APPROVED'
        ? '✅ Policy for this customer is activated shortly'
        : '❌ Request rejected successfully';

    // 🔥 Remove card immediately
    const removed = this.requests.find(
      r => r.customerPolicyId === customerPolicyId
    );

    this.requests = this.requests.filter(
      r => r.customerPolicyId !== customerPolicyId
    )
    this.http.post(
      'http://localhost:7071/api/admin/approve',
      { customerPolicyId, status },
      { responseType: 'text' }
    ).subscribe({
      next: () => {
        
        setTimeout(() => {
          this.message = '';
        }, 3000);
      },
      error: () => {
        
        this.message = '';
        this.error = '';

        if (removed) {
          this.requests.push(removed);
        }

        this.processingIds.delete(customerPolicyId);
      }
    });
  }
}
