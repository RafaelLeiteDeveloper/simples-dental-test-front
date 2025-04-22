import { Component, Input } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-checkbox-field',
  templateUrl: './checkbox-field.component.html',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  styleUrls: ['./checkbox-field.component.scss']
})
export class CheckboxFieldComponent {
  @Input() label!: string;
  @Input() control!: FormControl;
}
