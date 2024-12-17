import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Card } from 'primeng/card';
import { AuthService } from '../../../services/auth/auth.service';
import { FloatLabel } from 'primeng/floatlabel';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, FloatLabel, Card, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  authService = inject(AuthService)
  router = inject(Router)

  username: string = ''
  password: string = ''

  onRegister() {
    this.authService.register(this.username, this.password).subscribe({
      next: () => {
        alert('You registered successfully')
        this.router.navigate(['/login'])
      },
      error: (err) => {
        console.error(err)
        alert('You registered successfully')
      }
    })
  }
}
