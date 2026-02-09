import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard';
import { AuthGuard } from './guards/auth-guard';

// ADMIN
import { CreatePolicyComponent } from './components/create-policy/create-policy';
import { AdminPoliciesComponent } from './components/admin-policies/admin-policies';
import { AdminRequestsComponent } from './components/admin-requests/admin-requests';
import { AdminCustomersComponent } from './components/admin-customers/admin-customers';

// CUSTOMER
import { CustomerProfileComponent } from './components/customer-profile/customer-profile';
import { CustomerPoliciesComponent } from './components/customer-policies/customer-policies';

export const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // ================= ADMIN =================
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'ADMIN' },
    children: [
      { path: 'create-policy', component: CreatePolicyComponent },
      { path: 'policies', component: AdminPoliciesComponent },
      { path: 'requests', component: AdminRequestsComponent },
      { path: 'customers', component: AdminCustomersComponent }
    ]
  },

  // ================= CUSTOMER =================
  {
    path: 'customer',
    component: CustomerDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'CUSTOMER' },
    children: [
      { path: 'profile', component: CustomerProfileComponent },
      { path: 'policies', component: CustomerPoliciesComponent },
      { path: 'my-policies', component: CustomerPoliciesComponent },
      { path: 'requested-policies', component: CustomerPoliciesComponent }
    ]
  }

];
