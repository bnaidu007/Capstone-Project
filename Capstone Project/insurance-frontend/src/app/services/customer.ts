import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = 'http://localhost:7071/api/customer';

  constructor(private http: HttpClient) {}

  // ✅ CUSTOMER PROFILE
  getProfile(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${username}`);
  }

  // ✅ ALL POLICIES
  getAllPolicies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/policies`);
  }

  // ✅ APPLY POLICY
  applyPolicy(username: string, policyId: number): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/apply?username=${username}&policyId=${policyId}`,
      {}
    );
  }

  // ✅ MY POLICIES
  getMyPolicies(username: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/my-policies?username=${username}`
    );
  }
}
