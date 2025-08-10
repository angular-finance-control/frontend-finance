import { ChartEvent } from "chart.js";

export interface ChartDataType {
    label: string;
    value: number;
    color: string;
}

export interface ChartEventType {
    event: ChartEvent;
    active: object[];
}

export interface ChartHoverType extends ChartEventType {}

export interface ChartClickType extends ChartEventType {}