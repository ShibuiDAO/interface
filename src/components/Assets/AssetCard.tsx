import ProtectedMultiSourceContentDisplay from 'components/ProtectedMultiSourceContentDisplay';
import Link from 'next/link';
import React from 'react';
import { When } from 'react-if';

export interface AssetCardProps {
	contract?: string;
	collection?: string;
	name?: string;
	image: string;
	validOrder?: boolean;
	currentSellPrice?: string;
	pastSellPrice?: string;
	ownerAction?: () => void;
}

const AssetCard: React.FC<AssetCardProps> = ({ contract, collection, name, image, validOrder, currentSellPrice, pastSellPrice, ownerAction }) => {
	return (
		<div className="card-bordered card max-h-[24.4rem] max-w-[17rem] rounded-md shadow-lg dark:border-darks-100 dark:bg-darks-100 dark:text-black">
			<figure>
				<ProtectedMultiSourceContentDisplay src={image} className="max-h-[17rem] max-w-[17rem]" />
			</figure>
			<div className="card-body m-0 p-3 pt-0 pb-1">
				<h2 className="card-title m-0 p-1">
					<Link href={`/app/collection/${contract}`} passHref={true}>
						<a href="/" className="truncate text-xs">
							{collection || null}
						</a>
					</Link>
					<div className="truncate text-sm font-semibold">{name || null}</div>
				</h2>
			</div>
			<When condition={validOrder}>
				<hr />
				<div className="card-body m-0 p-0">
					<div className="grid grid-cols-2 grid-rows-1">
						{currentSellPrice && (
							<span className="py-3 pl-3 dark:bg-darks-100 dark:text-black">
								<span className="truncate text-sm">Price</span>
								<div className="p-0">
									<img src="/assets/icons/ether.svg" alt="Ether" className="inline pr-1" />
									<span className="text-sm font-bold leading-3">{currentSellPrice}</span>
								</div>
							</span>
						)}
						{pastSellPrice && (
							<span className="py-3 pl-3 dark:bg-darks-400 dark:text-white">
								<span className="truncate text-sm">Last</span>
								<div className="p-0">
									<img src="/assets/icons/ether_white.svg" alt="Ether" className="inline pr-1" />
									<span className="text-sm font-bold leading-3">{pastSellPrice}</span>
								</div>
							</span>
						)}
					</div>
				</div>
			</When>
			<When condition={Boolean(ownerAction)}>
				<hr />
				<button className="card-body m-0 p-0" onClick={ownerAction}>
					<span className="w-full py-3 dark:bg-lights-300 dark:text-white">
						<div className="truncate text-center text-sm">List your NFT</div>
					</span>
				</button>
			</When>
		</div>
	);
};

export default AssetCard;
