export interface CurrencyConfig {
  align?: 'left' | 'right';
  allowNegative?: boolean;
  decimal?: string;
  precision?: number;
  prefix?: string;
  suffix?: string;
  thousands?: string
}

export const CURRENCY_CONFIGS = {
  BRL_DEFAULT: {
    prefix: 'R$ ',
    suffix: '',
    thousands: '.',
    decimal: ',',
    precision: 2,
    allowNegative: false,
    align: 'left'
  } as CurrencyConfig,

  BRL_EXPENSES: {
    prefix: 'R$ ',
    suffix: '',
    thousands: '.',
    decimal: ',',
    precision: 2,
    allowNegative: false,
    align: 'left'
  } as CurrencyConfig,

  BRL_INVESTMENTS: {
    prefix: 'R$ ',
    suffix: '',
    thousands: '.',
    decimal: ',',
    precision: 2,
    allowNegative: false,
    align: 'left'
  } as CurrencyConfig,

  USD: {
    prefix: '$ ',
    suffix: '',
    thousands: ',',
    decimal: '.',
    precision: 2,
    allowNegative: false,
    align: 'left'
  } as CurrencyConfig,

  EUR: {
    prefix: '€ ',
    suffix: '',
    thousands: '.',
    decimal: ',',
    precision: 2,
    allowNegative: false,
    align: 'left'
  } as CurrencyConfig,

  PERCENTAGE: {
    prefix: '',
    suffix: ' %',
    thousands: '.',
    decimal: ',',
    precision: 2,
    allowNegative: false,
    align: 'left'
  } as CurrencyConfig,

  INTEGER: {
    prefix: '',
    suffix: '',
    thousands: '.',
    decimal: ',',
    precision: 0,
    allowNegative: false,
    align: 'left'
  } as CurrencyConfig,

  SIMPLE_NUMBER: {
    prefix: '',
    suffix: '',
    thousands: '',
    decimal: '.',
    precision: 2,
    allowNegative: false,
    align: 'left'
  } as CurrencyConfig
};