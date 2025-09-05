import { ListType } from "../../types/list";

export const iconHelper = (type: ListType) => {
    switch (type) {
        case ListType.LUXO:
            return 'shopping_cart';
        case ListType.ALIMENTACAO:
            return 'diamond_shone';
        case ListType.CONTAS_FIXAS:
            return 'wallet';
    }
}