import MultiSourceContentDisplay from 'components/MultiSourceContentDisplay';
import { BigNumber, ethers } from 'ethers';
import React from 'react';

export interface AssetProps {
	collection: string;
	name?: string;
	image?: string;

	price?: BigInt;
}

const Asset: React.FC<AssetProps> = ({ collection, name, image, price }) => {
	return (
		<>
			<div className="max-w-[16.4rem] min-w-[16.4rem]">
				<div className={`relative rounded-lg bg-gray-600 z-10 border-4 h-full border-gray-500`}>
					<div className="min-h-[16rem] min-w-[16rem] relative">
						{image && (
							<MultiSourceContentDisplay
								src={image}
								className="rounded-lg absolute left-0 right-0 top-0 bottom-0 m-auto max-h-64 max-w-[16rem]"
							/>
						)}
					</div>
					<div className="px-6 py-2">
						<div className="text-sm text-gray-400 truncate">{collection}</div>
						{name && <div className="font-semibold truncate">{name}</div>}
						{price && <div>{ethers.utils.formatEther(BigNumber.from(price))}Ξ</div>}
					</div>
				</div>
			</div>
		</>
	);
};

export default Asset;
