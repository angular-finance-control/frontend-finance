import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from '../inputs/text/input-text.component';
import { SelectComponent } from '../inputs/select/select.component';
import { ButtonComponent } from '../button/button.component';
import { SelectItems } from '../../shared/types/select';
import { FormConfig, FormData } from '../../shared/types/formData';

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
    <form 
      [formGroup]="expenseForm" 
      (ngSubmit)="onSubmit()" 
      [style]="containerStyles">
      
      <finance-input-text 
        [label]="config.valueLabel || 'Valor'"
        [placeholder]="config.valuePlaceholder || 'R$ 0,00'"
        [inputId]="'expenseValue'"
        [useCurrency]="config.showCurrency ?? true"
        [debounceTime]="config.debounceTime || 1000"
        formControlName="value"
      />

      <finance-select
        [label]="config.typeLabel || 'Tipo'"
        [placeholder]="config.typePlaceholder || 'Selecione o tipo'"
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
  standalone: true,
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  @Input() typeOptions: SelectItems[] = [];
  @Input() config: FormConfig = {};
  @Input() initialValue: FormData | null = null;
  @Input() isLoading: boolean = false;
  @Input() showValidationErrors: boolean = true;
  @Input() resetAfterSubmit: boolean = true;

  @Output() formSubmit = new EventEmitter<FormData>();
  @Output() formChange = new EventEmitter<FormData>();
  @Output() formValid = new EventEmitter<boolean>();

  expenseForm: FormGroup;
  containerStyles: string = '';

  constructor(private fb: FormBuilder) {
    this.expenseForm = this.createForm();
  }

  ngOnInit() {
    this.containerStyles = this.config.containerStyles || 'display: flex; flex-flow: row wrap; gap: 10px;';
    
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
    const minValue = this.config.minValue || 0.01;
    
    return this.fb.group({
      value: [0, [Validators.required, Validators.min(minValue)]],
      type: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      const formData: FormData = {
        value: Number(this.expenseForm.value.value),
        type: this.expenseForm.value.type
      };

      this.formSubmit.emit(formData);

      if (this.resetAfterSubmit) {
        this.resetForm();
      }
    } else {
      this.expenseForm.markAllAsTouched();
    }
  }

  resetForm() {
    this.expenseForm.reset({
      value: 0,
      type: this.typeOptions.length > 0 ? this.typeOptions[0].value : ''
    });
  }

  isValid(): boolean {
    return this.expenseForm.valid;
  }
}