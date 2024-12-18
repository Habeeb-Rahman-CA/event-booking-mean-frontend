import { Component, inject, OnInit } from '@angular/core';
import { IEvent } from '../../../models/event';
import { EventService } from '../../../services/event/event.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, CardModule],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent implements OnInit {

  eventService = inject(EventService)
  route = inject(ActivatedRoute)

  eventId: string = ''
  eventDetails: IEvent | null = null
  bookingMessage: string = ''
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
        this.bookingMessage = 'Booking Successful'
        this.hasBooked = true
      },
      error: (err) => {
        this.bookingMessage = err.error.message || 'Booking Failed'
      }
    })
  }

}
