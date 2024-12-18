import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { IEvent } from '../../../models/event';
import { EventService } from '../../../services/event/event.service';
import { Router } from '@angular/router';
import { CreateEventComponent } from "../create-event/create-event.component";
import { Toast } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, Dialog, CreateEventComponent, Toast, Ripple],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {

  events: IEvent[] = []

  eventService = inject(EventService)
  router = inject(Router)
  messageService = inject(MessageService)

  role: string | null = null

  visible: boolean = false
  position: any

  onVisibleChange(visible: boolean) {
    this.visible = visible
  }

  ngOnInit(): void {
    this.role = localStorage.getItem('currentUserRole')
    this.getEvents()
  }

  showDialog(postion: string) {
    this.visible = true
    this.position = postion
  }

  getEvents() {
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

  onBook(id: string) {
    this.eventService.getEventById(id).subscribe({
      next: () => {
        this.router.navigate(['/events', id])
      },
      error: (err) => console.error(err)
    })
  }

  onCancel(id: string) {
    this.eventService.cancelEvent(id).subscribe({
      next: () => {
        this.getEvents()
        this.messageService.add({severity: 'success', summary: 'Cancelled Event', detail: 'You are successfully Removed the event', life: 3000})
      },
      error: (err) => console.error(err)
    })
  }

}
