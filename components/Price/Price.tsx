import { Box } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { priceDown, priceUp } from "./Price.style";

type PriceProps = {value: number; currencyRate: number;}

export const Price: React.FC<PriceProps> = ({ value, currencyRate }) => {
	const prev = useRef(currencyRate);

	useEffect(() => {
		prev.current = currencyRate;
	}, [currencyRate]);

	let animation;
	if (value) {
		animation = prev.current > currencyRate
		? priceDown
		: prev.current < currencyRate ? priceUp : undefined
	}
	
	return (
		<Box animation={animation ? `${animation} ease-in 1s` : ''}>
			{ (value * currencyRate).toFixed(2) } руб.
		</Box>
	)
}