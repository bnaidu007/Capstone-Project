import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // ✅ REQUIRED
  templateUrl: './customer-profile.html',
  styleUrl: './customer-profile.css'
})
export class CustomerProfileComponent implements OnInit {

  customer: any = null;
  error = '';
  loading = true;

  constructor(private http: HttpClient) {}

 ngOnInit(): void {
  console.log('Profile component initialized');

  const username = localStorage.getItem('username');
  console.log('Username from storage:', username);

  if (!username) {
    this.error = 'User not logged in';
    this.loading = false;
    return;
  }

  this.http
    .get(`http://localhost:7071/api/customer/${username}`)
    .subscribe({
      next: (data) => {
        console.log('API SUCCESS:', data);
        this.customer = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('API FAILED:', err);
        this.error = 'Failed to load profile';
        this.loading = false;
      }
    });
}
}