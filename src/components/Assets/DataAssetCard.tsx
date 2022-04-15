import CurrentOrderAction from 'components/OrderManipulation/CurrentOrderAction';
import { SupportedChainId } from 'constants/chains';
import { BigNumber, ethers } from 'ethers';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAssetMetadata } from 'state/reducers/assets';
import { OrderDirection, selectSellOrder } from 'state/reducers/orders';
import AssetCard from './AssetCard';

export interface DataAssetCardProps {
	chainId: SupportedChainId;
	contract: string;
	identifier: BigInt;
}

const DataAssetCard: React.FC<DataAssetCardProps> = ({ chainId, contract, identifier }) => {
	let { account, library } = useActiveWeb3React();
	account = account?.toLowerCase() || '';

	const metadata = useSelector(selectAssetMetadata(chainId, contract, identifier));
	const sellOrder = useSelector(selectSellOrder(contract, identifier));

	if (!metadata) return null;

	const isOwned = Boolean(metadata?.owner && account && metadata.owner === account);

	const assetCard = (
		<AssetCard
			contract={contract}
			collection={metadata.collection}
			name={metadata.name}
			image={metadata.image_final}
			validOrder={sellOrder !== undefined}
			currentSellPrice={sellOrder?.price ? ethers.utils.formatEther(BigNumber.from(sellOrder.price)) : undefined}
			owned={isOwned}
		/>
	);

	return (
		<>
			{isOwned && library ? (
				<CurrentOrderAction<OrderDirection.DISPLAY>
					direction={OrderDirection.DISPLAY}
					data={{
						contract,
						identifier: identifier.toString()
					}}
				>
					{assetCard}
				</CurrentOrderAction>
			) : (
				<>{assetCard}</>
			)}
		</>
	);
};

export default DataAssetCard;
