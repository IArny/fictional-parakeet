import { StoreonModule } from 'storeon'

const isBrowser = () => ![typeof window, typeof document].includes('undefined');

export const CART_LOCAL_STORAGE_KEY = 'cart';

export type CartState = {
	cart: Record<string, number>
};

export enum CartActions {
	add = 'cart/add',
	remove = 'cart/remove',
	setQuantity = 'cart/setQuantity'
}

export const cart: StoreonModule<CartState> = (store) => {
	store.on('@init', () => {
		const cart = isBrowser() ? window.localStorage.getItem(CART_LOCAL_STORAGE_KEY) : '';

		return {
			cart: cart ? JSON.parse(cart) : {}
		};
	});

	store.on(CartActions.add, ({ cart }, id) => ({
		cart: {
			...cart,
			[id]: cart[id] ? (cart[id] + 1) : 1
		}
	}))

	store.on(CartActions.remove, ({ cart }, id) => ({
		cart: {
			...cart,
			[id]: undefined
		}
	}))

	store.on(CartActions.setQuantity, ({ cart }, {id, value}) => ({
		cart: {
			...cart,
			[id]: value
		}
	}))
}
