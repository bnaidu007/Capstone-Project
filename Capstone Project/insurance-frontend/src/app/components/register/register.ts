import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {

  user = {
    name: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    dob: '',
    address: ''
  };

  loading = false;
  message = '';
  error = '';

  // ✅ THIS WAS MISSING — REQUIRED
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  register() {
    this.message = '';
    this.error = '';

    // ❌ Full name should not contain numbers
    if (!/^[A-Za-z ]+$/.test(this.user.name)) {
      this.error = '❌ Full name should contain only letters';
      return;
    }

    // ❌ Phone number must be exactly 10 digits
    if (!/^[0-9]{10}$/.test(this.user.phone)) {
      this.error = '❌ Phone number must be exactly 10 digits';
      return;
    }

    // ❌ Username "admin" not allowed
    if (this.user.username.toLowerCase() === 'admin') {
      this.error = '❌ Username "admin" is not allowed';
      return;
    }

    this.loading = true;

    this.http
      .post('http://localhost:7071/api/customer/register', this.user)
      .subscribe({
        next: () => {
          this.loading = false;
          this.message = '✅ Account created successfully! Redirecting to login...';

          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1500);
        },
        error: (err) => {
          this.loading = false;
          this.error =
            err.status === 409
              ? '❌ Username or email already exists'
              : '❌ Registration failed. Please try again.';
        }
      });
  }
}
