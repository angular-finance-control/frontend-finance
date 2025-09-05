import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { SelectItems } from '../../../shared/types/select';

@Component({
  selector: 'finance-select',
  imports: [MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  template: `
    <mat-form-field [appearance]="appearance">
      <mat-label>{{ label }}</mat-label>
      <mat-select 
        [value]="value" 
        [placeholder]="placeholder"
        (selectionChange)="onSelectionChange($event.value)"
        [disabled]="isDisabled">
        @for (item of items; track item.value) {
          <mat-option [value]="item.value">{{ item.viewValue }}</mat-option>
        }
      </mat-select>
    </mat-form-field>
  `,
  styleUrl: './select.component.scss',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() appearance: MatFormFieldAppearance = 'outline';
  @Input() label: string = 'Select';
  @Input() placeholder: string = 'Choose option';
  @Input() name: string = 'select';
  @Input() items: SelectItems[] = [];

  value: string = '';
  isDisabled: boolean = false;
  
  private onChange = (value: any) => {};
  private onTouched = () => {};

  onSelectionChange(value: string): void {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}