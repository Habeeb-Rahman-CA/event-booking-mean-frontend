import { Component, inject, OnInit } from '@angular/core';
import { IEvent } from '../../../models/event';
import { EventService } from '../../../services/event/event.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, CardModule, DividerModule, RouterModule, Toast, Ripple],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent implements OnInit {

  eventService = inject(EventService)
  route = inject(ActivatedRoute)
  messageService = inject(MessageService)

  eventId: string = ''
  eventDetails: IEvent | null = null
  hasBooked: boolean = false

  ngOnInit(): void {
      this.route.params.subscribe((params) =>{
        this.eventId = params['id']
        this.getEventDetails()
      })
  }

  getEventDetails(){
    this.eventService.getEventById(this.eventId).subscribe({
      next: (res: IEvent) => {
        this.eventDetails = res
      },
      error: (err) => console.error(err)
    })
  }

  bookNow(){
    this.eventService.bookEvent(this.eventId).subscribe({
      next:()=>{
        this.hasBooked = true
        this.messageService.add({severity: 'success', summary: 'Booked for event', detail: 'You successfully booked for the event', life: 3000})
      },
      error: (err) => {
        this.messageService.add({severity: 'error', summary: 'Logged In', detail: 'Ticket is unavailable', life: 3000})
      }
    })
  }

}
