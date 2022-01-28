import { useQuery } from '@apollo/client';
import { Account } from '@shibuidao/erc721exchange-types';
import type { Erc721Contract, Erc721Token } from '@subgraphs/eip721-matic';
import type { EIP721Response, ERC721ExchangeResponse } from 'client';
import { ChainSubgraphSets, generateEIP721ContractQuery, generateERC721ExchangeQuery } from 'client/queries';
import ERC721Asset from 'components/Assets/ERC721Asset';
import { SupportedChainId } from 'constants/chains';
import { COLLECTION_REFRESH_INTERVAL, DEFAULT_CHAIN } from 'constants/misc';
import { BigNumber } from 'ethers';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import React from 'react';
import { useDispatch } from 'react-redux';
import { fillBuyOrders, fillSellOrders } from 'state/reducers/orders';

export interface CollectionAssetsProps {
	address: string;
}

const CollectionAssets: React.FC<CollectionAssetsProps> = ({ address }) => {
	const dispatch = useDispatch();
	const { chainId } = useActiveWeb3React();
	const chainIdNormalised: SupportedChainId = chainId || DEFAULT_CHAIN;

	const [EIP721Subgraph, ERC721ExchangeSubgraph] = ChainSubgraphSets[chainIdNormalised];

	const { data: assetsData, loading: assetsLoading } = useQuery<EIP721Response<'erc721Contract'>>(generateEIP721ContractQuery(chainIdNormalised), {
		variables: { contract: address },
		context: { subgraph: EIP721Subgraph },
		fetchPolicy: 'no-cache',
		pollInterval: COLLECTION_REFRESH_INTERVAL
	});

	const { data: exchangeData, loading: exchangeLoading } = useQuery<ERC721ExchangeResponse<'account'>>(
		generateERC721ExchangeQuery(chainIdNormalised),
		{
			variables: { contract: address },
			context: { subgraph: ERC721ExchangeSubgraph },
			fetchPolicy: 'no-cache',
			pollInterval: COLLECTION_REFRESH_INTERVAL
		}
	);

	if ((!assetsData || !assetsData.erc721Contract) && !assetsLoading) return null;

	if (exchangeData && exchangeData.account && !exchangeLoading) {
		dispatch(fillSellOrders((exchangeData?.account as Account).contractSellOrders));
		dispatch(fillBuyOrders((exchangeData?.account as Account).contractBuyOrders));
	}

	return (
		<>
			{assetsLoading || !assetsData ? (
				<span>Loading</span>
			) : (
				<>
					{((assetsData.erc721Contract as Erc721Contract).tokens as Erc721Token[])
						.sort((a, b) => {
							const { contractSellOrders } = exchangeData?.account as Account;
							const orderA = contractSellOrders.find((order) => order.contract.id === a.contract.id && order.token === a.identifier);
							const orderB = contractSellOrders.find((order) => order.contract.id === b.contract.id && order.token === b.identifier);

							const aPricePresent = typeof orderA?.price !== 'undefined';
							const bPricePresent = typeof orderB?.price !== 'undefined';

							return (
								Number(bPricePresent) - Number(aPricePresent) ||
								(aPricePresent && BigNumber.from(orderA.price).sub(BigNumber.from(orderB?.price)).div(1000000000000).toNumber()) ||
								0
							);
						})
						.map((token) => (
							<ERC721Asset token={token} chainId={chainIdNormalised} key={token.id} />
						))}
				</>
			)}
		</>
	);
};

export default CollectionAssets;
