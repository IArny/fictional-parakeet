import React, { useCallback } from "react";
import { useStoreon } from "storeon/react";
import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Spinner,
	Heading,
	Stat,
	StatLabel,
	StatNumber,
  } from "@chakra-ui/react"
  
import { CartActions } from "../../store/cart";
import { State } from "../../store";
import { Product } from "../../store/products";
import { Price } from "../Price/Price";

type ProductItemProps = {
	id: string;
	name: string;
	price?: number;
	quantity?: number;
}

type GroupProps = {
	name: string;
	products: Product[];
};

const StatStyle = {
	padding: '10px',
	cursor: 'pointer',
	border: '1px solid transparent',
	":hover": {
		border: '1px solid #ceceff',
	}
}

const ProductItem: React.FC<ProductItemProps> = ({ id, name, price = 0, quantity = 0 }) => {
	const { dispatch, currency } = useStoreon<State>('currency');
	const handleClick = useCallback(() => {
		if (!quantity) {
			dispatch(CartActions.add, id)
		} else {
			console.log('Товар не доступен');
		}
	}, [dispatch]);

	return (
		<Stat sx={StatStyle} onClick={handleClick}>
			<StatLabel>{name}</StatLabel>
			<StatNumber><Price value={price} currencyRate={currency} /></StatNumber>
		</Stat>
	);
}

const Group: React.FC<GroupProps> = ({ name, products }) => (
	<AccordionItem>
		<h2>
			<AccordionButton>
				<Heading as="h2" size="md">
					{ name }
				</Heading>
				<AccordionIcon />
			</AccordionButton>
		</h2>
		<AccordionPanel pb={4}>
			{ products ? products.map(p => (
				<ProductItem
					key={p.id}
					id={p.id}
					name={p.name}
					price={p.price} />
			)) : null }
		</AccordionPanel>
	</AccordionItem>
);

export const Products: React.FC<{}> = () => {
	const { products: {groupIds, groups, products, isLoading} } = useStoreon<State>('products');
	const expandedItems = groupIds.map((_, k) => k);

	return isLoading ? (
		<Spinner /> 
	) : groupIds.length > 0 ? (
		<Accordion allowMultiple allowToggle defaultIndex={expandedItems}>
			{groupIds.map((id) => (
				<Group
					key={id}
					name={groups[id].name}
					products={groups[id].productIds.map(id => products[id])} />
			))}
		</Accordion>
	) : null;
}