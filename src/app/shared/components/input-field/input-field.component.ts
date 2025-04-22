import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {CommonModule, NgClass} from '@angular/common';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  imports: [
    ReactiveFormsModule,
    NgClass,
    CommonModule
  ],
  styleUrls: ['./input-field.component.scss'],
  standalone: true
})
export class InputFieldComponent {
  @Input() label!: string;
  @Input() placeholder: string = '';
  @Input() control!: FormControl;
  @Input() required: boolean = false;
  @Input() type: string = 'text';
  @Input() min: number = 1;

  getErrorMessage(): string {
    if (!this.control.errors) return '';

    if (this.control.hasError('required')) {
      return `${this.label} is required`;
    }

    if (this.control.hasError('maxlength')) {
      return `${this.label} exceeds maximum length`;
    }

    if (this.control.hasError('min')) {
      return `${this.label} must be greater than 0`;
    }

    return `${this.label} is invalid`;
  }
}
