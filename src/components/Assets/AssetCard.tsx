import MultiSourceContentDisplay from 'components/MultiSourceContentDisplay';
import CurrentOrderAction from 'components/OrderManipulation/CurrentOrderAction';
import { SupportedChainId } from 'constants/chains';
import { BigNumber, ethers } from 'ethers';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAssetMetadata } from 'state/reducers/assets';
import { OrderDirection, selectSellOrder } from 'state/reducers/orders';

export interface AssetProps {
	chainId: SupportedChainId;
	contract: string;
	identifier: BigInt;
}

const Asset: React.FC<AssetProps> = ({ chainId, contract, identifier }) => {
	let { account, library } = useActiveWeb3React();
	account = account?.toLowerCase() || '';

	const metadata = useSelector(selectAssetMetadata(chainId, contract, identifier));
	const sellOrder = useSelector(selectSellOrder(contract, identifier));

	if (!metadata) return null;

	const ownerSellBookCondition = sellOrder?.token !== identifier && metadata?.owner && account && metadata.owner === account;
	const ownerSellCancelCondition = sellOrder?.token === identifier && metadata?.owner && account && metadata.owner === account;
	const userBuyCondition = sellOrder && sellOrder.token === identifier && metadata?.owner && account && metadata.owner !== account;

	return (
		<div className="card card-bordered dark:bg-darks-400 dark:border-chain-boba shadow-lg max-w-[14rem]">
			<figure>
				<MultiSourceContentDisplay src={metadata.image_final} className="" />
			</figure>
			<div className="card-body p-4">
				<h2 className="card-title mb-1">
					<Link href={`/collection/${contract}`} passHref={true}>
						<a href="/" className="text-sm text-chain-boba truncate">
							{metadata?.collection && metadata.collection}
						</a>
					</Link>
					<div className="text-base font-semibold truncate">{metadata.name}</div>
				</h2>
				<div className="px-6 py-2">{sellOrder && <div>{ethers.utils.formatEther(BigNumber.from(sellOrder.price))}Ξ</div>}</div>
				{ownerSellBookCondition && (
					<div className="justify-end card-actions mt-2">
						<CurrentOrderAction<OrderDirection.APPROVE>
							className="btn btn-primary"
							direction={OrderDirection.APPROVE}
							data={{
								contract,
								identifier: identifier.toString()
							}}
						>
							Sell
						</CurrentOrderAction>
					</div>
				)}
				{ownerSellCancelCondition && library && (
					<div className="justify-end card-actions mt-2">
						<CurrentOrderAction<OrderDirection.CANCEL>
							className="btn btn-primary"
							direction={OrderDirection.CANCEL}
							data={{
								contract: sellOrder.contract.id,
								identifier: sellOrder.token.toString()
							}}
						>
							Cancel
						</CurrentOrderAction>
					</div>
				)}
				{userBuyCondition && library && (
					<div className="justify-end card-actions mt-2">
						<CurrentOrderAction<OrderDirection.EXERCISE>
							className="btn btn-primary"
							direction={OrderDirection.EXERCISE}
							data={{
								seller: sellOrder.seller.id,
								recipient: account!,
								contract: sellOrder.contract.id,
								identifier: sellOrder.token.toString(),
								expiration: sellOrder.expiration.toString(),
								price: sellOrder.price.toString()
							}}
						>
							Buy
						</CurrentOrderAction>
					</div>
				)}
			</div>
		</div>
	);
};

export default Asset;
