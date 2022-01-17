import MultiSourceContentDisplay from 'components/MultiSourceContentDisplay';
import { SupportedChainId } from 'constants/chains';
import { BigNumber, ethers } from 'ethers';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAssetMetadata } from 'state/reducers/assets';
import { OrderDirection, selectSellOrder, setCurrentOrder } from 'state/reducers/orders';

export interface AssetProps {
	chainId: SupportedChainId;
	contract: string;
	identifier: BigInt;
}

const Asset: React.FC<AssetProps> = ({ chainId, contract, identifier }) => {
	let { account } = useActiveWeb3React();
	account = account?.toLowerCase() || '';

	const dispatch = useDispatch();
	const metadata = useSelector(selectAssetMetadata(chainId, contract, identifier));
	const sellOrder = useSelector(selectSellOrder(contract, identifier));

	if (!metadata) return null;

	const ownerSellCondition = sellOrder?.token !== identifier && metadata?.owner && account && metadata.owner === account;
	const userBuyCondition = sellOrder?.token === identifier && metadata?.owner && account && metadata.owner !== account;

	return (
		<div className="card card-bordered max-w-[14rem]">
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
				{ownerSellCondition && (
					<div className="justify-end card-actions mt-2">
						<button
							onClick={() =>
								dispatch(
									setCurrentOrder({ ordering: true, contract, identifier: identifier.toString(), direction: OrderDirection.BOOK })
								)
							}
							className="btn btn-primary"
						>
							Sell
						</button>
					</div>
				)}
				{userBuyCondition && (
					<div className="justify-end card-actions mt-2">
						<button
							onClick={() =>
								dispatch(
									setCurrentOrder({
										ordering: true,
										user: account!,
										contract,
										identifier: identifier.toString(),
										direction: OrderDirection.EXECUTE
									})
								)
							}
							className="btn btn-primary"
						>
							Buy
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Asset;
