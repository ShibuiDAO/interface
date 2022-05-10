import type { Erc721Token } from '@subgraphs/eip721-matic';
import { ABI } from 'constants/abis';
import { SupportedChainId } from 'constants/chains';
import useProviders from 'hooks/useProviders';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssetMetadata, selectAssetMetadata } from 'state/reducers/assets';
import DataAssetCard from './DataAssetCard';

export interface ERC721AssetProps {
	token: Erc721Token;
	chainId: SupportedChainId;
}

const ERC721Asset: React.FC<ERC721AssetProps> = ({ token, chainId }) => {
	const baseProvider = useProviders()[chainId as SupportedChainId];
	const dispatch = useDispatch();

	const metadata = useSelector(selectAssetMetadata(chainId, token.contract?.id, token.identifier));

	useEffect(() => {
		if (metadata !== undefined && metadata.owner === token.owner.id) return;

		dispatch(
			fetchAssetMetadata({
				token: {
					owner: token.owner?.id,
					identifier: token.identifier,
					contract: {
						id: token.contract?.id,
						name: token.contract?.name || undefined
					}
				},
				chainId,
				provider: baseProvider,
				contractABI: ABI.EIP721
			})
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <DataAssetCard chainId={chainId} contract={token.contract.id} identifier={token.identifier} />;
};

export default ERC721Asset;
