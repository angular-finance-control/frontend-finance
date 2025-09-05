import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges, OnChanges } from '@angular/core';
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
          formControlName="type"
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

  @Output() formSubmit = new EventEmitter<FormData>();
  @Output() formChange = new EventEmitter<FormData>();
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
      const formData: FormData = {
        value: Number(this.expenseForm.value.value),
        description: this.expenseForm.value.description,
        type: this.expenseForm.value.type
      };

      this.formSubmit.emit(formData);

      if (this.resetAfterSubmit) {
        this.resetForm();
      }
    } 

    this.expenseForm.markAllAsTouched();
  }

  resetForm() {
    this.expenseForm.reset({
      value: 0,
      description: '',
      type: this.typeOptions.length > 0 ? this.typeOptions[0].value : ''
    });
  }
}