import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from '../inputs/text/input-text.component';
import { SelectComponent } from '../inputs/select/select.component';
import { ButtonComponent } from '../button/button.component';
import { SelectItems } from '../../shared/types/select';
import { FormConfig, FormData } from '../../shared/types/formData';
import { CURRENCY_CONFIGS, CurrencyConfig } from '../../shared/configs/currency.config';

@Component({
  selector: 'finance-expense-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextComponent,
    SelectComponent,
    ButtonComponent
  ],
  template: `
    <form [formGroup]="expenseForm" (ngSubmit)="onSubmit()" class="form">
      @for (item of config.inputs; track $index) {
        <finance-input-text 
          [label]="item.label"
          [placeholder]="item.placeholder"
          [inputId]="item.inputId"
          [useCurrency]="item.useCurrency"
          [currencyConfig]="item.currencyConfig? item.currencyConfig : currencyConfiguration"
          [debounceTime]="item.debounceTime"
          [formControlName]="item.key"
        />
      }  
        <finance-select
          [label]="config.selectInput?.label || 'Tipo'"
          [placeholder]="config.selectInput?.placeholder || 'Selecione o tipo'"
          [name]="'expenseType'"
          [items]="typeOptions"
          [formControlName]="config.selectInput?.key || 'type'"
      />

      <finance-button 
        type="submit" 
        [text]="config.buttonText || 'Adicionar'"
        [disabled]="expenseForm.invalid || isLoading"
        [color]="'primary'"
      />

    </form>
  `,
  styleUrl: './form.component.scss',
  standalone: true
})
export class FormComponent implements OnInit {
  @Input() typeOptions: SelectItems[] = [];
  @Input() config: FormConfig = {};
  @Input() initialValue: FormData | null = null;
  @Input() isLoading = false;
  @Input() showValidationErrors = true;
  @Input() resetAfterSubmit = true;
  @Input() currencyType: keyof typeof CURRENCY_CONFIGS = 'BRL_EXPENSES';

  @Output() formSubmit = new EventEmitter<any>();
  @Output() formChange = new EventEmitter<any>();
  @Output() formValid = new EventEmitter<boolean>();

  expenseForm: FormGroup = new FormGroup({});

  get currencyConfiguration(): CurrencyConfig {
    return CURRENCY_CONFIGS[this.currencyType];
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {    
    this.expenseForm = this.createForm();
    if (this.initialValue) {
      this.expenseForm.patchValue(this.initialValue);
    }

    this.expenseForm.valueChanges.subscribe(value => {
      this.formChange.emit(value);
    });

    this.expenseForm.statusChanges.subscribe(status => {
      this.formValid.emit(status === 'VALID');
    });
  }

  private createForm(): FormGroup {
    const formControls: { [key: string]: any } = {};

    this.config.inputs?.forEach(input => {
      formControls[input.key] = ['', Validators.required];
    });

    this.config.selectInput?.key && (formControls[this.config.selectInput.key] = ['', Validators.required]);
    return this.fb.group(formControls);
  }

  onSubmit() {

    if (this.expenseForm.valid) {
      this.formSubmit.emit(this.expenseForm.value);

      if (this.resetAfterSubmit) {
        this.resetForm();
      }
    } else {
      this.expenseForm.markAllAsTouched();
    }
  }

  resetForm() {
    const resetValue: any = {};
    
    this.config.inputs?.forEach(input => {
      resetValue[input.key] = input.useCurrency ? 0 : '';
    });

    this.config.selectInput?.key && (resetValue[this.config.selectInput.key] = '');
    
    this.expenseForm.reset(resetValue);
  }
}