export enum ListType {
    LUXO = 'luxo',
    ALIMENTACAO = 'alimentacao',
    CONTAS_FIXAS = 'contasFixas'
}    

export interface List {
    type: ListType;
    value: number;
    description?: string;
    icon?: string;
}