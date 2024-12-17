import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = "http://localhost:5001/api/auth"

  constructor(private http: HttpClient) { }

  login(username: string, password: string){
    return this.http.post(`${this.baseUrl}/login`, {username, password})
  }

  register(username:string, password: string){
    return this.http.post(`${this.baseUrl}/register`, {username, password})
  }
}
