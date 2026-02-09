import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-customers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-customers.html',
  styleUrl: './admin-customers.css'
})
export class AdminCustomersComponent implements OnInit {

  allCustomers: any[] = [];
  customers: any[] = [];

  loading = true;
  error = '';
  searchText = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers() {
    this.loading = true;

    this.http
      .get<any[]>('http://localhost:7071/api/admin/customers')
      .subscribe({
        next: data => {
          this.allCustomers = data || [];
          this.customers = [...this.allCustomers];
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load customers';
          this.loading = false;
        }
      });
  }

  searchCustomers() {
    const keyword = this.searchText.trim().toLowerCase();

    if (!keyword) {
      this.customers = [...this.allCustomers];
      return;
    }

    this.customers = this.allCustomers.filter(c =>
      (c.username && c.username.toLowerCase().includes(keyword)) ||
      (c.name && c.name.toLowerCase().includes(keyword)) ||
      (c.email && c.email.toLowerCase().includes(keyword))
    );
  }
}
