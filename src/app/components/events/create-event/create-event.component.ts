import { Component, inject } from '@angular/core';
import { IEvent } from '../../../models/event';
import { EventService } from '../../../services/event/event.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { TextareaModule } from 'primeng/textarea';
import { IftaLabelModule } from 'primeng/iftalabel';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, CalendarModule, TextareaModule, IftaLabelModule, Card],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {

  eventService = inject(EventService)

  eventData: IEvent = {
    title: '',
    description: '',
    date: '',
    location: ''
  }

  successMessage = ''
  errorMessage = ''

  onSubmit() {
    this.eventService.createEvent(this.eventData).subscribe({
      next: () => {
        this.successMessage = 'Event created succesfully'
        this.errorMessage = ''
        this.eventData = {
          title: '',
          description: '',
          date: new Date(),
          location: ''
        }
      },
      error: (err) =>{
        this.errorMessage = err.error.message || "Failed to create this event"
        this.successMessage = ''
      }
    })
  }
}
