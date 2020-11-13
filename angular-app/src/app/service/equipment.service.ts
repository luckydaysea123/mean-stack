import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HOST } from 'env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  URL: string;
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) {
    this.URL = HOST + '/equipments';
  }

  getAll(): Observable<any> {
    return this.http.get(this.URL);
  }

  addEquipment(equipment): Observable<any> {
    return this.http.post(this.URL, equipment);
  }

  editEquipment(id, equipment): Observable<any> {
    return this.http.put(`${this.URL}/${id}`, equipment);
  }

  deleteEquipment(id): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`);
  }

  getByOwner(id): Observable<any> {
    return this.http.get(`${this.URL}/user/${id}`);
  }
}
