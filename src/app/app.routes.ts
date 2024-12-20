import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { EventListComponent } from './components/events/event-list/event-list.component';
import { EventDetailsComponent } from './components/events/event-details/event-details.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'events', component: EventListComponent},
    {path: 'events/:id', component: EventDetailsComponent}
];
