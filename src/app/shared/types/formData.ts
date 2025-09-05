import { CurrencyConfig } from "../configs/currency.config";
import { SelectItems } from "./select";

export interface FormData {
    value: number;
    description?: string;
    type: string;
}

export interface FormInput {
    label: string;
    placeholder: string;
    inputId: string;
    useCurrency: boolean;
    currencyConfig?: CurrencyConfig;
    debounceTime: number;
    key: string;
}

export interface SelectInput {
    label: string;
    placeholder: string;
    name: string;
    key: string;
}

export interface FormConfig {
    inputs?: FormInput[];
    selectInput?: SelectInput;
    buttonText?: string;
}