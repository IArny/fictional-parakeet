import { Box, Button, NumberInput, NumberInputField, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useCallback } from 'react'
import { useStoreon } from "storeon/react";
import { State } from '../../store';
import { CartActions } from '../../store/cart';
import { LocalStorage } from '../LocalStorage/LocalStorage';

type CartItemProps = {
	id: string;
	name: string;
	price: string;
	quantity: number;
	maxQuantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ id, name, quantity, price, maxQuantity }) => {
	const { dispatch } = useStoreon();
	const handleRemove = useCallback(() => {
		dispatch(CartActions.remove, id);
	}, [dispatch, id]);

	const handleChangeQuantity = useCallback((value) => {
		dispatch(CartActions.setQuantity, {id, value: Number(value)})
	}, [dispatch, id]);

	return (
		<Tr>
			<Td>{name}</Td>
			<Td>
				<NumberInput
					onChange={handleChangeQuantity}
					size="xs"
					value={quantity}
					min={1}
					max={maxQuantity}
				>
					<NumberInputField />
				</NumberInput>
				{quantity > maxQuantity && (
					<Box color="red">Количество ограничено</Box>
				)}
			</Td>
			<Td>{price} руб/шт</Td>
			<Td><Button color="red" onClick={handleRemove}>Удалить</Button></Td>
		</Tr>
	)
}

export const Cart: React.FC<{}> = () => {
	const {
		dispatch, currency, cart, products: { products }
	} = useStoreon<State>('cart', 'products', 'currency');

	const finalPrice = Object.keys(cart).reduce((acc, id) => {
		return acc + ((cart[id] * products[id].price * currency) || 0)
	}, 0);

	return (
		<React.Fragment>
			<LocalStorage />

			<Table variant="simple">
				<Thead>
					<Tr>
						<Th>Наименование товара и описание</Th>
						<Th>Количество</Th>
						<Th>Цена</Th>
						<Th></Th>
					</Tr>
				</Thead>
				<Tbody>
					{ Object.entries(cart).map(([k, v]) => typeof v !== 'undefined' ? (
						<CartItem
							key={k}
							id={k}
							maxQuantity={products[k].quantity}
							name={products[k].name}
							price={(products[k].price * currency).toFixed(2)}
							quantity={v} />
					) : null) }
				</Tbody>
			</Table>
			<Box>Общая стоимость {finalPrice.toFixed(2)} руб.</Box>
		</React.Fragment>
	);
}