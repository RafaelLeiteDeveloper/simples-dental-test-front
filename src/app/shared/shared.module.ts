import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { TextareaFieldComponent } from './components/textarea-field/textarea-field.component';
import {SelectFieldComponent} from './components/select-field/select-field.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectFieldComponent,
    InputFieldComponent,
    TextareaFieldComponent
  ],
  exports: [
    InputFieldComponent,
    TextareaFieldComponent,
    SelectFieldComponent
  ]
})
export class SharedModule {}
