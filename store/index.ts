import { createStoreon } from 'storeon'
import { products, ProductsState } from './products'
import { cart, CartState } from './cart'
import { currency, CurrencyState } from './currency'

export type State = ProductsState & CartState & CurrencyState;

export const store = createStoreon<State>([products, cart, currency])