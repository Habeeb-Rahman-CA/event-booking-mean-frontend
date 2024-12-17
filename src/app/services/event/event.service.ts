import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEvent } from '../../models/event';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  baseUrl = "http://localhost:5001/api/events"

  constructor(private http: HttpClient) { }

  getEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(this.baseUrl)
  }

  getEventById(id: string): Observable<IEvent> {
    return this.http.get<IEvent>(`${this.baseUrl}/${id}`)
  }

  createEvent(eventData: IEvent): Observable<IEvent> {
    const token = localStorage.getItem('token')
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post<IEvent>(`${this.baseUrl}`, eventData, { headers: header })
  }

  bookEvent(id: string) {
    const token = localStorage.getItem('token')
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post<IEvent>(`${this.baseUrl}/${id}/book`, {}, { headers: header })
  }

}
