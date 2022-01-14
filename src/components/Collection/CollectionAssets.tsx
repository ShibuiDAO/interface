import { useQuery } from '@apollo/client';
import type { Erc721Contract, Erc721Token } from '@subgraphs/eip721-matic';
import type { EIP721Response, ERC721ExchangeResponse } from 'client';
import { ChainSubgraphSets, generateEIP721ContractQuery, generateERC721ExchangeQuery } from 'client/queries';
import ERC721Asset from 'components/Assets/ERC721Asset';
import { SupportedChainId } from 'constants/chains';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import React from 'react';

export interface CollectionAssetsProps {
	address: string;
}

const CollectionAssets: React.FC<CollectionAssetsProps> = ({ address }) => {
	const { chainId } = useActiveWeb3React();
	const chainIdNormalised: SupportedChainId = chainId || SupportedChainId.BOBA;

	const [EIP721Subgraph, ERC721ExchangeSubgraph] = ChainSubgraphSets[chainIdNormalised];

	const { data: assetsData, loading: assetsLoading } = useQuery<EIP721Response<'erc721Contract'>>(generateEIP721ContractQuery(chainIdNormalised), {
		variables: { owner: address },
		context: { subgraph: EIP721Subgraph },
		fetchPolicy: 'no-cache'
	});

	const { data: exchangeData, loading: exchangeLoading } = useQuery<ERC721ExchangeResponse<'account'>>(
		generateERC721ExchangeQuery(chainIdNormalised),
		{
			variables: { contract: address },
			context: { subgraph: ERC721ExchangeSubgraph },
			fetchPolicy: 'no-cache'
		}
	);

	if ((!assetsData || !assetsData.erc721Contract) && !assetsLoading) return null;
	if ((!exchangeData || !exchangeData.account) && !exchangeLoading) return null;

	return (
		<>
			{assetsLoading || !assetsData || exchangeLoading || !exchangeData ? (
				<span>Loading</span>
			) : (
				<>
					{(assetsData.erc721Contract as Erc721Contract).tokens.map((token: Erc721Token) => (
						<ERC721Asset token={token} key={token.id} />
					))}
				</>
			)}
		</>
	);
};

export default CollectionAssets;
