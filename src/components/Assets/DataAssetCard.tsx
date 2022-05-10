import { SupportedChainId } from 'constants/chains';
import { BigNumber, ethers, Signer } from 'ethers';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAssetMetadata } from 'state/reducers/assets';
import { executeSellOrder, OrderDirection, selectSellOrder, setCurrentOrder, SimpleSellOrder } from 'state/reducers/orders';
import { useAccount, useSigner } from 'wagmi';
import AssetCard from './AssetCard';

export interface DataAssetCardProps {
	chainId: SupportedChainId;
	contract: string;
	identifier: BigInt;
}

const DataAssetCard: React.FC<DataAssetCardProps> = ({ chainId, contract, identifier }) => {
	const { data: account } = useAccount();
	const { data: signer } = useSigner();

	const accountFormatted = account?.address?.toLowerCase() || '';
	const dispatch = useDispatch();

	const metadata = useSelector(selectAssetMetadata(chainId, contract, identifier));
	const sellOrder = useSelector(selectSellOrder(contract, identifier));

	if (!metadata) return null;

	const isOwned = Boolean(metadata?.owner && accountFormatted && metadata.owner === accountFormatted);
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
	const exerciseFunction = (order: SimpleSellOrder, chainId_: SupportedChainId, signer_: Signer, account_: string) => () => {
		dispatch(
			executeSellOrder({
				chainId: chainId_,
				signer: signer_,
				data: {
					seller: order.seller.id,
					tokenContractAddress: order.contract.id,
					tokenId: BigNumber.from(order.token),
					expiration: BigNumber.from(order.expiration),
					price: BigNumber.from(order.price),
					recipient: account_
				}
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
				ownerAction={isOwned && signer ? orderFunction(contract, identifier.toString()) : undefined}
				userBuyAction={
					!isOwned && sellOrder && signer && chainId && account
						? exerciseFunction(sellOrder, chainId as SupportedChainId, signer, accountFormatted)
						: undefined
				}
			/>
		</>
	);
};

export default DataAssetCard;
