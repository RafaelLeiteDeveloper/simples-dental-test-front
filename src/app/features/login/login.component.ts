import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputFieldComponent} from '../../shared/components/input-field/input-field.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    ReactiveFormsModule,
    InputFieldComponent,
    NgIf
  ],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  invalidCredentials = false;

  get emailControl(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.form.get('password') as FormControl;
  }

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.form.valid) {
      this.invalidCredentials = false;

      this.authService.login(this.form.value).subscribe({
        next: () => window.location.href = '/',
        error: () => {
          this.invalidCredentials = true;
          setTimeout(() => {
            this.invalidCredentials = false;
          }, 2500);
        }
      });
    }
  }
}
