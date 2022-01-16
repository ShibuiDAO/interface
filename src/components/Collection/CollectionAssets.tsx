import { useQuery } from '@apollo/client';
import type { Erc721Contract, Erc721Token } from '@subgraphs/eip721-matic';
import { Account } from '@shibuidao/erc721exchange-types';
import type { EIP721Response, ERC721ExchangeResponse } from 'client';
import { ChainSubgraphSets, generateEIP721ContractQuery, generateERC721ExchangeQuery } from 'client/queries';
import ERC721Asset from 'components/Assets/ERC721Asset';
import { SupportedChainId } from 'constants/chains';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import React from 'react';
import { useDispatch } from 'react-redux';
import { fillBuyOrders, fillSellOrders } from 'state/reducers/orders';
import { COLLECTION_REFRESH_INTERVAL, DEFAULT_CHAIN } from 'constants/misc';

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
					{(assetsData.erc721Contract as Erc721Contract).tokens.map((token: Erc721Token) => (
						<ERC721Asset token={token} chainId={chainIdNormalised} key={token.id} />
					))}
				</>
			)}
		</>
	);
};

export default CollectionAssets;
