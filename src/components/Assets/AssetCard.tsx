import MultiSourceContentDisplay from 'components/MultiSourceContentDisplay';
import { SupportedChainId } from 'constants/chains';
import { BigNumber, ethers } from 'ethers';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAssetMetadata } from 'state/reducers/assets';
import { selectSellOrder } from 'state/reducers/orders';
import { When } from 'react-if';

export interface AssetProps {
	chainId: SupportedChainId;
	contract: string;
	identifier: BigInt;
}

const Asset: React.FC<AssetProps> = ({ chainId, contract, identifier }) => {
	let { account } = useActiveWeb3React();
	account = account?.toLowerCase() || '';

	const metadata = useSelector(selectAssetMetadata(chainId, contract, identifier));
	const sellOrder = useSelector(selectSellOrder(contract, identifier));

	if (!metadata) return null;

	return (
		<div className="card-bordered card max-h-[24.4rem] max-w-[17rem] shadow-lg dark:border-darks-100 dark:bg-darks-100 dark:text-black">
			<figure>
				<MultiSourceContentDisplay src={metadata.image_final} className="max-h-[17rem] max-w-[17rem]" />
			</figure>
			<div className="card-body m-0 p-3 pt-0 pb-1">
				<h2 className="card-title m-0 p-1">
					<Link href={`/collection/${contract}`} passHref={true}>
						<a href="/" className="truncate text-xs">
							{metadata?.collection && metadata.collection}
						</a>
					</Link>
					<div className="truncate text-sm font-semibold">{metadata.name}</div>
				</h2>
			</div>
			<When condition={sellOrder !== undefined}>
				<hr />
				<div className="card-body m-0 p-0">
					<div className="grid grid-cols-2 grid-rows-1">
						<span className="pl-3 pb-3 dark:bg-darks-100 dark:text-black">
							{sellOrder && (
								<>
									<span className="truncate text-sm">Price</span>
									<div className="p-0">
										<img src="/assets/icons/ether.svg" alt="Ether" className="inline pr-1" />
										<span className="text-sm font-bold leading-3">
											{ethers.utils.formatEther(BigNumber.from(sellOrder.price))}
										</span>
									</div>
								</>
							)}
						</span>
						<span className="pl-3 dark:bg-darks-400 dark:text-white">
							<>
								<span className="truncate text-sm">Last</span>
							</>
						</span>
					</div>
				</div>
			</When>
		</div>
	);
};

export default Asset;
