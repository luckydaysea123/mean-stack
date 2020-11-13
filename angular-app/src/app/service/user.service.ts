import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HOST } from 'env';
import { from, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  userSession;
  URL: string;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.URL = HOST + '/users';
    const token = localStorage.getItem('token');
    if (!token) {
      this.handleUnauthorized();
      return;
    }
    const payload: any = jwt_decode(token);
    this.userSession = payload.user;
  }

  login(username, password): Observable<any> {
    return this.http.post(this.URL + '/login', { username, password });
  }

  register(username, password): Observable<any> {
    return this.http.post(this.URL + '/', { username, password });
  }

  getAll(): Observable<any> {
    return this.http.get(this.URL);
  }

  getByID(id): Observable<any> {
    return this.http.get(this.URL + '/' + id);
  }

  deleteByID(id): Observable<any> {
    return this.http.delete(this.URL + '/' + id);
  }

  add(user): Observable<any> {
    return this.http.post(this.URL, user);
  }

  edit(id, user): Observable<any> {
    return this.http.put(`${this.URL}/${id}`, user);
  }

  checkAuth() {
    if (this.userSession) {
      return true;
    }
    this.handleUnauthorized();
  }

  handleUnauthorized() {
    this.userSession = undefined;
    localStorage.clear();
    this.router.navigateByUrl('login');
  }
}
