import { Component, Input } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CommonModule, NgIf} from '@angular/common';

@Component({
  selector: 'app-textarea-field',
  templateUrl: './textarea-field.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf,
    CommonModule
  ],
  styleUrls: ['./textarea-field.component.scss']
})
export class TextareaFieldComponent {
  @Input() label!: string;
  @Input() placeholder: string = '';
  @Input() control!: FormControl;
  @Input() rows: number = 3;
}
