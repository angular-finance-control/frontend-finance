import { ListType } from "../../types/list";

export const iconHelper = (type: ListType) => {
    switch (type) {
        case ListType.LUXO:
            return 'diamond_shone';
        case ListType.ALIMENTACAO:
            return 'shopping_cart';
        case ListType.CONTAS_FIXAS:
            return 'wallet';
    }
}