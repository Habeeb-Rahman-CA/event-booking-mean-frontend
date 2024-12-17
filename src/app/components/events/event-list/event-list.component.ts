import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IEvent } from '../../../models/event';
import { EventService } from '../../../services/event/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {

  events: IEvent[] = []

  eventService = inject(EventService)
  router = inject(Router)

  ngOnInit(): void {
      this.getEvents()
  }

  getEvents(){
    this.eventService.getEvents().subscribe({
      next: (res: IEvent[]) => {
        this.events = res
      },
      error: (err) => {
        console.error(err)
        alert('Failed to fetch data')
      }
    })
  }

  onBook(id: string){
    this.router.navigate(['/events', id])
  }

}
