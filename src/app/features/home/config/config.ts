import { FormConfig } from "../../../shared/types/formData";

export const formConfig: FormConfig = {
    valueLabel: 'Valor do gasto',
    valuePlaceholder: 'R$ 0,00',
    typeLabel: 'Tipo de gasto',
    typePlaceholder: 'Selecione o tipo',
    buttonText: 'Adicionar Gasto',
    showCurrency: true,
    minValue: 0.01,
    debounceTime: 1000,
    containerStyles: 'display: flex; flex-flow: row wrap; gap: 10px; align-items: flex-start;'
  };