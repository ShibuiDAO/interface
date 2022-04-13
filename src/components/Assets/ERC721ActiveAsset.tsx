import type { Erc721Token } from '@subgraphs/eip721-matic';
import CurrentOrderAction from 'components/OrderManipulation/CurrentOrderAction';
import { ABI } from 'constants/abis';
import { SupportedChainId } from 'constants/chains';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useProviders from 'hooks/useProviders';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssetMetadata, selectAssetMetadata } from 'state/reducers/assets';
import { OrderDirection, selectSellOrder } from 'state/reducers/orders';
import DataAssetCard from './DataAssetCard';

export interface ERC721ActiveAssetProps {
	token: Erc721Token;
	chainId: SupportedChainId;
}

const ERC721ActiveAsset: React.FC<ERC721ActiveAssetProps> = ({ token, chainId }) => {
	const { library, account } = useActiveWeb3React();
	const baseProvider = useProviders()[chainId as SupportedChainId];
	const dispatch = useDispatch();

	const metadata = useSelector(selectAssetMetadata(chainId, token.contract?.id, token.identifier));
	const sellOrder = useSelector(selectSellOrder(token.contract?.id, token.identifier));

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
				provider: account && library ? library : baseProvider,
				contractABI: ABI.EIP721
			})
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const ownerSellBookCondition = sellOrder?.token !== token.identifier && metadata?.owner && account && metadata.owner === account;
	const dataAssetCard = <DataAssetCard chainId={chainId} contract={token.contract.id} identifier={token.identifier} />;

	return (
		<>
			{Boolean(token.contract && ownerSellBookCondition && library) ? (
				<CurrentOrderAction<OrderDirection.DISPLAY>
					direction={OrderDirection.DISPLAY}
					data={{
						contract: token.contract.id,
						identifier: token.identifier.toString()
					}}
				>
					{dataAssetCard}
				</CurrentOrderAction>
			) : (
				<>{dataAssetCard}</>
			)}
		</>
	);
};

export default ERC721ActiveAsset;
