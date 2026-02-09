import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:7071/api/auth/login';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<string> {
    return this.http.post<any>(this.apiUrl, {
      username,
      password
    }).pipe(
      map(response => response.role)   // 🔥 THIS IS THE KEY FIX
    );
  }
}
