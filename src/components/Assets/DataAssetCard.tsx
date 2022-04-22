import { SupportedChainId } from 'constants/chains';
import { BigNumber, ethers } from 'ethers';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAssetMetadata } from 'state/reducers/assets';
import { OrderDirection, selectSellOrder, setCurrentOrder } from 'state/reducers/orders';
import AssetCard from './AssetCard';

export interface DataAssetCardProps {
	chainId: SupportedChainId;
	contract: string;
	identifier: BigInt;
}

const DataAssetCard: React.FC<DataAssetCardProps> = ({ chainId, contract, identifier }) => {
	let { account, library } = useActiveWeb3React();
	account = account?.toLowerCase() || '';
	const dispatch = useDispatch();

	const metadata = useSelector(selectAssetMetadata(chainId, contract, identifier));
	const sellOrder = useSelector(selectSellOrder(contract, identifier));

	if (!metadata) return null;

	const isOwned = Boolean(metadata?.owner && account && metadata.owner === account);
	const orderFunction = (contract_: string, identifier_: string) => () => {
		dispatch(
			setCurrentOrder({
				contract: contract_,
				identifier: identifier_,
				ordering: true,
				direction: OrderDirection.DISPLAY
			})
		);
	};

	return (
		<>
			<AssetCard
				contract={contract}
				collection={metadata.collection}
				name={metadata.name}
				image={metadata.image_final}
				validOrder={sellOrder !== undefined}
				currentSellPrice={sellOrder?.price ? ethers.utils.formatEther(BigNumber.from(sellOrder.price)) : undefined}
				ownerAction={isOwned && library ? orderFunction(contract, identifier.toString()) : undefined}
			/>
		</>
	);
};

export default DataAssetCard;
