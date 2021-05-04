import { StoreonModule } from "storeon";

const getCurrentRate = () => 80 - Math.random()*30;

let intervalId;

export type CurrencyState = { currency: number };

export enum CurrencyActions {
	update = 'currency/update',
	subscribe = 'currency/subscribe',
	unsubscribe = 'currency/unsubscribe'
}

export const currency: StoreonModule<CurrencyState> = (store) => {
	store.on('@init', () => ({
		currency: getCurrentRate()
	}));

	store.on(CurrencyActions.update, ({ currency }) => ({
		currency: getCurrentRate()
	}));

	store.on(CurrencyActions.subscribe, async () => {
		intervalId = setInterval(() => {
			store.dispatch(CurrencyActions.update);
		}, 20000)
	})

	store.on(CurrencyActions.unsubscribe, async () => {
		clearInterval(intervalId);
	})
}
