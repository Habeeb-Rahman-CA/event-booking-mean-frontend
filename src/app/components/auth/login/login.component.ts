import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Card } from 'primeng/card';
import { AuthService } from '../../../services/auth/auth.service';
import { FloatLabel } from 'primeng/floatlabel';
import { Router, RouterModule } from '@angular/router';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, FloatLabel, Card, RouterModule, Toast, Ripple],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  authService = inject(AuthService)
  router = inject(Router)
  messageService = inject(MessageService)

  username : string = ''
  password: string = ''

  onLogin(){
    this.authService.login(this.username, this.password).subscribe({
      next:(res: any) => {
        localStorage.setItem('token', res.token)
        localStorage.setItem('currentUserRole', res.user.role)
        this.messageService.add({severity: 'success', summary: 'Logged In', detail: 'You are successfully logged in', life: 3000})
        this.router.navigate(['/events'])
      },
      error: (err) => {
        console.error(err)
        this.messageService.add({severity: 'error', summary: 'Failed to Log in', detail: 'You failed to logged in', life: 3000})
      }
    })
  }

}