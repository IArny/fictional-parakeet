
const PRODUCT_NAME = 'N';
const PRODUCTS_LIST = 'B'
const GROUP_NAME = 'G';


type ProductType = {
	[PRODUCT_NAME]: string;
}

type ProductGroup = {
	[GROUP_NAME]: string;
	[PRODUCTS_LIST]: Record<string, ProductType>
}

type Names = Record<string, ProductGroup>;

export const namesMapper = (data: Names) => {
	const groupIds = Object.keys(data);
	const groups = {};
	const products = {};

	groupIds.forEach(id => {
		const productsList = data[id][PRODUCTS_LIST];
		const productIds = Object.keys(productsList);
		
		productIds.forEach(id => {
			products[id] = {
				id,
				name: productsList[id][PRODUCT_NAME],
				price: 0,
				quantity: 0
			};
		});

		groups[id] = {
			id,
			name: data[id][GROUP_NAME],
			productIds
		};
	});

	return {
		groups,
		products,
		groupIds
	};
}