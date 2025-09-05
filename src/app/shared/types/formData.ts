export interface FormData {
    value: number;
    type: string;
}

export interface FormConfig {
    valueLabel?: string;
    valuePlaceholder?: string;
    typeLabel?: string;
    typePlaceholder?: string;
    buttonText?: string;
    showCurrency?: boolean;
    minValue?: number;
    debounceTime?: number;
    containerStyles?: string;
}