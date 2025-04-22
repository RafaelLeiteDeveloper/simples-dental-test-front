import { Component, Input } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  styleUrls: ['./select-field.component.scss']
})
export class SelectFieldComponent {
  @Input() options: any[] = [];
  @Input() displayKey: string = 'label';
  @Input() valueKey: string = 'value';
  @Input() placeholder: string = 'Select';
  @Input() label: string = '';
  @Input() control!: FormControl;
}
