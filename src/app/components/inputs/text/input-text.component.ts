import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NgxCurrencyDirective } from 'ngx-currency';
import { CommonModule } from '@angular/common';
import { EventEmitterSlider } from '../../../shared/types/slider';
import { debounce } from '../../../shared/utils/debounce.utils';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'finance-input-text',
  imports: [ 
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    NgxCurrencyDirective,
    CommonModule
  ],
  template: `
     <mat-form-field class="input-text" [appearance]="appearance">
      <mat-label>{{ label }}</mat-label>
      
      @if(useCurrency) {
        <input 
          matInput 
          placeholder="{{ placeholder }}" 
          [(ngModel)]="currentValue"
          [currencyMask]="{ prefix: 'R$ ', thousands: '.', decimal: ',', precision: 2 }"
          (ngModelChange)="onCurrencyChange($event)">
      }
      
      @else {
        <input 
          matInput 
          placeholder="{{ placeholder }}" 
          [(ngModel)]="currentTextValue"
          (input)="onTextChange($event)">
      }
    </mat-form-field>
  `,
  styleUrl: './input-text.component.scss',
  standalone: true
})

export class InputTextComponent {
  @Input({required: true}) label!: string;
  @Input({required: true}) placeholder!: string;
  @Input({required: true}) inputId!: string;
  @Input() debounceTime: number = 300;
  @Input() appearance: MatFormFieldAppearance = 'outline';
  @Input() useCurrency: boolean = false;

  @Output() valueChange = new EventEmitter<EventEmitterSlider>();

  currentValue: number | null = null;
  currentTextValue: string = '';

  private debouncedEmit = debounce((value: any) => {
    this.valueChange.emit(value);
  }, this.debounceTime);

  onCurrencyChange(value: number | null): void {
    this.debouncedEmit({id: this.inputId, value: value || 0});
  }

  onTextChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.debouncedEmit({id: this.inputId, value: target.value});
  }
}