import { FormConfig } from "../../../shared/types/formData";
import { CURRENCY_CONFIGS } from "../../../shared/configs/currency.config";

export const formConfig: FormConfig = {
  inputs: [
    {
      label: 'Valor do gasto',
      placeholder: 'R$ 0,00',
      inputId: 'expenseValue',
      useCurrency: true,
      currencyConfig: CURRENCY_CONFIGS.BRL_EXPENSES,
      debounceTime: 1000,
      key: 'value'
    },
    {
      label: 'Descrição',
      placeholder: 'Descrição',
      inputId: 'expenseDescription',
      useCurrency: false,
      debounceTime: 1000,
      key: 'description'
    }
  ],
  selectInput: {
    label: 'Tipo de gasto',
    placeholder: 'Selecione o tipo',
    name: 'expenseType',
    key: 'type'
  },
  buttonText: 'Adicionar Gasto'
};