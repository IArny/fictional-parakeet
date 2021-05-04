import { StoreonModule } from 'storeon'
import { namesMapper } from './namesMapper';

let intervalId;

export type Product = {
	id: string;
	name: string;
	price?: number;
	quantity?: number;
};

export type ProductsState = {
	products: {
		error: string;
		isLoading: boolean;
		groupIds: string[];
		groups: Record<string, { id: string; name: string; productIds: string[] }>;
		products: Record<string, Product>;
	}
};

type Good = {
	C: number; // цена товара в долларах
	G: number; // id группы
	T: number; // id товара
	P: number; // количество
}

type ProductsResponse = {
	Error: string;
	Success:true;
	Value: { 
		Goods: Good[]
	};
}


export enum Actions {
	setNames = 'products/setNames',
	setProps = 'products/setProps',
	error = 'products/error',
	loading = 'products/loading',
	fetchNames = 'products/fetchNames',
	fetchProducts = 'products/fetchProducts',
	subscribe = 'products/subscribe',
	unsubscribe = 'products/unsubscribe',
	updateProducts = 'products/updateProducts',
}

export const products: StoreonModule<ProductsState> = (store) => {
	store.on('@init', () => ({
		products: {
			error: null,
			isLoading: false,
			groups: {},
			products: {},
			groupIds: []
		}
	}));

	store.on(Actions.setNames, (state, data) => {
		const { products, groups, groupIds } = namesMapper(data);
		return {
			products: {
				...state.products,
				groupIds,
				groups,
				products,
				error: null,
			}
		}
	});
	
	store.on(Actions.error, (state, error) => ({
		products: {
			...state.products,
			error,
			isLoading: false,
		}
	}));

	store.on(Actions.loading, ({ products }, value = true) => ({
		products: {
			...products,
			error: null,
			isLoading: value,
		}
	}));

	store.on(Actions.fetchNames, async () => {
		try {
			store.dispatch(Actions.loading);

			const res = await fetch('/test/names.json');
			const data = await res.json();

			store.dispatch(Actions.setNames, data);
			store.dispatch(Actions.loading, false);
			store.dispatch(Actions.fetchProducts);
		} catch {
			store.dispatch(Actions.error, 'Ошибка при получении данных');
		}
	});

	store.on(Actions.updateProducts, ({ products }, data: Good[]) => {
		const newProducts = {...products.products};
		data.forEach(p => {
			newProducts[p.T] = {
				...newProducts[p.T],
				price: p.C,
				quantity: p.P
			}
		});

		return {
			products: {
				...products,
				products: newProducts
			}
		}
	});

	store.on(Actions.fetchProducts, async () => {
		try {
			const res = await fetch('/test/products.json');
			const data: ProductsResponse = await res.json();

			if (data.Success && !data.Error) {
				store.dispatch(Actions.updateProducts, data.Value.Goods);
			} else {
				store.dispatch(Actions.error, data.Error);
			}
		} catch {
			store.dispatch(Actions.error, 'Не удалось обновить данные');
		}
	});


	store.on(Actions.subscribe, async () => {
		intervalId = setInterval(() => {
			store.dispatch(Actions.fetchProducts);
		}, 15000)
	});

	store.on(Actions.unsubscribe, async () => {
		clearInterval(intervalId);
	});
}