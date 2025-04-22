import { Component, OnInit } from '@angular/core';
import { AuthService, AuthUser } from '../../core/services/auth.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./user-profile.component.scss'],
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {
  user!: AuthUser;
  form!: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.authService.getUserContext().subscribe(user => {
      this.user = user;
    });

    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  updatePassword() {
    if (this.form.valid) {
      this.authService.updatePassword(this.form.value.password).subscribe(() => {
        alert('Senha atualizada com sucesso!');
        this.form.reset();
      });
    }
  }
}
