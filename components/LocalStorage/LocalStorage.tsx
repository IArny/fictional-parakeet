import { useEffect } from "react";
import { useStoreon } from "storeon/react";
import {CART_LOCAL_STORAGE_KEY} from '../../store/cart';

export const LocalStorage: React.FC<{}> = () => {
	const { cart } = useStoreon('cart');
	
	useEffect(() => {
		window.localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(cart))
	}, [cart]);

	return null;
}