import type { Erc721Token } from '@subgraphs/eip721-matic';
import { ABI } from 'constants/abis';
import { SupportedChainId } from 'constants/chains';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMetadata, selectAssetMetadata } from 'state/reducers/assets';
import { selectSellOrder } from 'state/reducers/orders';
import AssetCard from './AssetCard';

export interface ERC721AssetProps {
	token: Erc721Token;
}

const ERC721Asset: React.FC<ERC721AssetProps> = ({ token }) => {
	const { library, chainId } = useActiveWeb3React();
	const dispatch = useDispatch();
	const [valid, setValid] = useState(true);

	const metadata = useSelector(selectAssetMetadata(chainId || SupportedChainId.BOBA, token.contract.id, token.identifier));
	const sellOrder = useSelector(selectSellOrder(token.contract.id, token.identifier));

	useEffect(() => {
		if (!token || !library || !chainId) {
			setValid(false);
			return;
		}

		if (metadata) return;

		dispatch(
			fetchMetadata({
				token: {
					identifier: token.identifier,
					contract: {
						id: token.contract.id,
						name: token.contract.name || undefined
					}
				},
				chainId: chainId || SupportedChainId.BOBA,
				provider: library,
				contractABI: ABI.EIP721
			})
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!valid || !metadata) return null;

	return <AssetCard collection={metadata.collection || ''} name={metadata.name} image={metadata.image_final} price={sellOrder?.price} />;
};

export default ERC721Asset;
