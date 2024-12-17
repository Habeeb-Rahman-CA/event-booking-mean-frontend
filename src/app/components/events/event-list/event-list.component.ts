import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { IEvent } from '../../../models/event';
import { EventService } from '../../../services/event/event.service';
import { Router } from '@angular/router';
import { CreateEventComponent } from "../create-event/create-event.component";

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, Dialog, CreateEventComponent],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {

  events: IEvent[] = []

  eventService = inject(EventService)
  router = inject(Router)
  
  visible: boolean = false
  position: any

  ngOnInit(): void {
      this.getEvents()
  }

  showDialog(postion: string){
    this.visible = true
    this.position = postion
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
