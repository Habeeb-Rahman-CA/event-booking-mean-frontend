import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Card } from 'primeng/card';
import { AuthService } from '../../../services/auth/auth.service';
import { FloatLabel } from 'primeng/floatlabel';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, FloatLabel, Card, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  authService = inject(AuthService)
  router = inject(Router)

  username : string = ''
  password: string = ''

  onLogin(){
    this.authService.login(this.username, this.password).subscribe({
      next:(res: any) => {
        localStorage.setItem('token', res.token)
        alert('You are successfully logged in')
        this.router.navigate(['/events'])
      },
      error: (err) => {
        console.error(err)
        alert('You failed to logged in')
      }
    })
  }
}
