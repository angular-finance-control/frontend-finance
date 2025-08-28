export interface Slider {
    id: string;
    label: string;
    value: number;
    max: number;
    disabled: boolean;
    color: string;
}

export interface EventEmitterSlider {
    value: number | string;
    id: string;
}