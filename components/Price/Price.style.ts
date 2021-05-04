import { keyframes } from '@chakra-ui/react';

const colors = {
	text: '#000',
	red: '#f1515c',
	redOpacity: '#f1515c44',
	green: '#00fe0f',
	greenOpacity: '#00fe0f44',
}

export const priceUp = keyframes`
	from, 40% {
		background-color: ${colors.greenOpacity}};
		color: ${colors.green});
	}
    to {
		background-color: transparent;
		color: ${colors.text};
	}
`

export const priceDown = keyframes`
	from, 40% {
		background-color: ${colors.redOpacity}};
		color: ${colors.red});
	}
    to {
		background-color: transparent;
		color: ${colors.text};
	}
`