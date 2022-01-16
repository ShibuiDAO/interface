import type { Erc721Token } from '@subgraphs/eip721-matic';
import { ABI } from 'constants/abis';
import { SupportedChainId } from 'constants/chains';
import { DEFAULT_CHAIN } from 'constants/misc';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useProviders from 'hooks/useProviders';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMetadata } from 'state/reducers/assets';
import AssetCard from './AssetCard';

export interface ERC721AssetProps {
	token: Erc721Token;
	chainId: SupportedChainId;
}

const ERC721Asset: React.FC<ERC721AssetProps> = ({ token, chainId }) => {
	const { library, account } = useActiveWeb3React();
	const baseProvider = useProviders()[DEFAULT_CHAIN];
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(
			fetchMetadata({
				token: {
					owner: token.owner.id,
					identifier: token.identifier,
					contract: {
						id: token.contract.id,
						name: token.contract.name || undefined
					}
				},
				chainId,
				provider: account && library ? library : baseProvider,
				contractABI: ABI.EIP721
			})
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <AssetCard chainId={chainId} contract={token.contract.id} identifier={token.identifier} />;
};

export default ERC721Asset;
