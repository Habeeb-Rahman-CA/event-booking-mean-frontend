import { Component, EventEmitter, inject, input, Input, Output } from '@angular/core';
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
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, CalendarModule, TextareaModule, IftaLabelModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {

  eventService = inject(EventService)

  @Input() visible: boolean = false
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() refreshEvents: EventEmitter<void> = new EventEmitter<void>()

  eventData: IEvent = {
    _id: '',
    title: '',
    description: '',
    date: '',
    location: ''
  }

  errorMessage = ''

  onSubmit() {
    this.eventService.createEvent(this.eventData).subscribe({
      next: () => {
        this.visible = false
        this.visibleChange.emit(this.visible)
        this.eventData = {
          _id: '',
          title: '',
          description: '',
          date: '',
          location: ''
        }
        this.refreshEvents.emit()
      },
      error: (err) => {
        this.errorMessage = err.error.message || "All Fields are required"
      }
    })
  }
}
