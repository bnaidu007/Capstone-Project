import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  username = '';
  password = '';
  errorMessage = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notification: NotificationService
  ) {}

  login() {
    this.loading = true;

    this.authService.login(this.username, this.password)
      .subscribe({
        next: (role: string) => {
          this.loading = false;

          localStorage.setItem('username', this.username);
          localStorage.setItem('role', role);

          // ✅ SUCCESS MESSAGE
          this.notification.success('Login successful');

          if (role === 'ADMIN') {
            this.router.navigateByUrl('/admin');
          } else {
            this.router.navigateByUrl('/customer');
          }
        },
       error: () => {
  this.loading = false;
  this.errorMessage = 'Invalid username or password';
  this.notification.error('Invalid username or password');
}

      });
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }
}
