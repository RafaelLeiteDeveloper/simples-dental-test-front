import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService, AuthUser } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: AuthUser | null = null;

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserContext().subscribe({
      next: (user: any) => this.user = user,
      error: () => this.user = null
    });
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    window.location.reload();
  }
}
