import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CurrencyConfig } from '../../../shared/configs/currency.config';

@Component({
  selector: 'finance-input-text',
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule,
    FormsModule,
    CurrencyMaskModule
  ],
  template: `
    <mat-form-field [appearance]="appearance">
      <mat-label>{{ label }}</mat-label>
      
      @if (useCurrency) {
        <input 
          matInput
          [placeholder]="placeholder"
          [id]="inputId"
          [(ngModel)]="value"
          (ngModelChange)="onValueChange($event)"
          (blur)="onBlur()"
          currencyMask
          [options]="currencyOptions"
          type="text"
        />
      } @else {
        <input 
          matInput 
          [placeholder]="placeholder"
          [id]="inputId"
          [value]="value"
          (input)="onInput($event)"
          (blur)="onBlur()"
          type="text"
        />
      }
    </mat-form-field>
  `,
  styleUrl: './input-text.component.scss',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})
export class InputTextComponent implements ControlValueAccessor {
  @Input() appearance: MatFormFieldAppearance = 'outline';
  @Input() label: string = 'Label';
  @Input() placeholder: string = 'Placeholder';
  @Input() inputId: string = 'input';
  @Input() useCurrency: boolean = false;
  @Input() debounceTime: number = 300;
  @Input() currencyConfig: CurrencyConfig = {};

  value: string | number = '';
  
  private onChange = (value: any) => {};
  private onTouched = () => {};

  get currencyOptions() {
    const { align, allowNegative, decimal, precision, prefix, suffix, thousands } = this.currencyConfig;

    return {
      align: align || 'right',
      allowNegative: allowNegative ?? false,
      decimal: decimal || ',',
      precision: precision ?? 2,
      prefix: prefix || 'R$ ',
      suffix: suffix || '',
      thousands: thousands || '.',
    };
  }

  onInput({ target }: Event): void {
    const value = (target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }
  
  onValueChange(value: number): void {
    this.value = value;
    this.onChange(value);
  }

  onBlur(): void {
    this.onTouched();
  }

  writeValue(value: any): void {
    if (this.useCurrency) {
      this.value = typeof value === 'number' ? value : (parseFloat(value) || 0);
    }

    this.value = value || '';
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}