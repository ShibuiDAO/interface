import { Account } from '@shibuidao/erc721exchange-types';
import type { Erc721Token } from '@subgraphs/eip721-matic';
import { ERC721ExchangeResponse } from 'client';
import { BigNumber } from 'ethers';
import { PriceSorting } from 'state/reducers/user';

export const sortERC721ByPrice =
	(priceSorting: PriceSorting, exchangeData?: ERC721ExchangeResponse<'account'>) => (a: Erc721Token, b: Erc721Token) => {
		const contractSellOrders = (exchangeData?.account as Account)?.contractSellOrders || [];
		const orderA = contractSellOrders.find((order) =>
			a === undefined ? false : order.contract.id === a.contract.id && order.token === a.identifier
		);
		const orderB = contractSellOrders.find((order) =>
			b === undefined ? false : order.contract.id === b.contract.id && order.token === b.identifier
		);

		const aPricePresent = typeof orderA?.price !== 'undefined';
		const bPricePresent = typeof orderB?.price !== 'undefined';

		return (
			Number(bPricePresent) - Number(aPricePresent) ||
			(aPricePresent &&
				BigNumber.from(priceSorting === PriceSorting.LtH ? orderA.price : orderB?.price)
					.sub(BigNumber.from(priceSorting === PriceSorting.LtH ? orderB?.price : orderA.price))
					.div(1000000000000)
					.toNumber()) ||
			0
		);
	};
