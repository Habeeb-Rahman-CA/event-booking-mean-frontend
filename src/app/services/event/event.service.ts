import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEvent } from '../../models/event';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  baseUrl = "localhost:5001/api/events"

  constructor(private http: HttpClient) { }

  getEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(this.baseUrl)
  }

  getEventById(id: string): Observable<IEvent> {
    return this.http.get<IEvent>(`${this.baseUrl}/${id}`)
  }

  bookEvent(id: string) {
    const token = localStorage.getItem('token')
    return this.http.post<IEvent>(`${this.baseUrl}/${id}/book`, {}, { headers: { Authorization: token || '' } })
  }

}
