import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RouterLink} from '@angular/router';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-user-management',
  imports: [
    RouterLink
  ],
  templateUrl: './admin-user-management.component.html'
})
export class AdminUserManagementComponent implements OnInit {
  users: User[] = [];

  constructor(private readonly http: HttpClient) {}

  ngOnInit() {
    this.http.get<User[]>('/api/users').subscribe(users => this.users = users);
  }
}
