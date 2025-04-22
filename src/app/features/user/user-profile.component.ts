import { Component, OnInit } from '@angular/core';
import { AuthService, AuthUser } from '../../core/services/auth.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
  styleUrls: ['./user-profile.component.scss'],
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {
  user!: AuthUser;
  form!: FormGroup;
  successMessage = ''
  errorMessage: string = '';

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.authService.getUserContext().subscribe(user => {
      this.user = user;
    });

    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.form.controls['password'].valueChanges.subscribe(() => {
      this.errorMessage = '';
      const control = this.form.controls['password'];
      if (control.touched || control.dirty) {
        if (control.errors?.['required']) {
          this.errorMessage = 'Password is required.';
        } else if (control.errors?.['minlength']) {
          this.errorMessage = 'The password must be at least 8 characters long.';
        }
      }
    });
  }


  updatePassword() {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.form.invalid) {
      const passwordErrors = this.form.controls['password'].errors;

      if (passwordErrors?.['required']) {
        this.errorMessage = 'Password is required.';
      } else if (passwordErrors?.['minlength']) {
        this.errorMessage = 'The password must be at least 8 characters long.';
      }

      return;
    }

    this.authService.updatePassword(this.form.value.password).subscribe({
      next: () => {
        this.successMessage = 'Password updated successfully!';
        this.form.reset();
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: () => {
        this.errorMessage = 'Failed to update the password. Please try again.';
      }
    });
  }
}
