import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'finance-input-text',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  template: `
    <mat-form-field [appearance]="appearance">
      <mat-label>{{ label }}</mat-label>
      <input 
        matInput 
        [placeholder]="placeholder"
        [id]="inputId"
        [value]="value"
        (input)="onInput($event)"
        (blur)="onBlur()"
        [type]="useCurrency ? 'number' : 'text'"
        [step]="useCurrency ? '0.01' : undefined"
        [min]="useCurrency ? '0' : undefined"
      />
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

  value: string | number = '';
  
  private onChange = (value: any) => {};
  private onTouched = () => {};

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    let value: string | number = target.value;
    
    if (this.useCurrency) {
      value = parseFloat(value) || 0;
    }
    
    this.value = value;
    this.onChange(value);
  }

  onBlur(): void {
    this.onTouched();
  }

  writeValue(value: any): void {
    this.value = value || (this.useCurrency ? 0 : '');
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}