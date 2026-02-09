import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  // ❗ existing admin / general base url (DO NOT CHANGE)
  private baseUrl = 'http://localhost:7071/api/policies';

  constructor(private http: HttpClient) {}

  // ================= EXISTING =================
  getAllPolicies(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  deletePolicy(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // ================= ADDED (CUSTOMER) =================

  // ✅ Requested policies (PENDING / REJECTED)
  getPendingPolicies(username: string): Observable<any[]> {
    return this.http.get<any[]>(
      `http://localhost:7071/api/customer/my-policies?username=${username}`
    );
  }

  // ✅ My policies (APPROVED)
  getApprovedPolicies(username: string): Observable<any[]> {
    return this.http.get<any[]>(
      `http://localhost:7071/api/customer/approved-policies?username=${username}`
    );
  }
}
