import { ListType } from "../../types/list";

export const colorChartHelper = (color: ListType) => {
    switch (color) {
        case ListType.LUXO:
            return '#FF6384';
        case ListType.ALIMENTACAO:
            return '#36A2EB';
        case ListType.CONTAS_FIXAS:
            return '#FFCE56';
    }
}
    