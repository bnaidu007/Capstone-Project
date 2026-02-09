import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';

type AdminView = 'NONE' | 'CREATE' | 'POLICIES' | 'REQUESTS' | 'CUSTOMERS';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet   
  ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboardComponent {

  activeView: AdminView = 'NONE';

  constructor(private router: Router) {}

  open(view: AdminView) {
    this.activeView = view;

    if (view === 'CREATE') this.router.navigate(['/admin/create-policy']);
    if (view === 'POLICIES') this.router.navigate(['/admin/policies']);
    if (view === 'REQUESTS') this.router.navigate(['/admin/requests']);
    if (view === 'CUSTOMERS') this.router.navigate(['/admin/customers']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
