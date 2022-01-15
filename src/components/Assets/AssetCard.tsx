import MultiSourceContentDisplay from 'components/MultiSourceContentDisplay';
// import { BigNumber, ethers } from 'ethers';
import Link from 'next/link';
import React from 'react';

export interface AssetProps {
	collection: string;
	collectionAddress: string;
	name?: string;
	image?: string;

	owner?: string;
	user?: string;

	price?: BigInt;
}

const Asset: React.FC<AssetProps> = ({ collection, collectionAddress, name, image, owner, user }) => {
	return (
		<div className="card card-bordered max-w-[14rem]">
			<figure>{image && <MultiSourceContentDisplay src={image} className="" />}</figure>
			<div className="card-body p-4">
				<h2 className="card-title mb-1">
					<Link href={`/collection/${collectionAddress}`} passHref={true}>
						<a href="/" className="text-base text-chain-boba truncate">
							{collection && collection}
						</a>
					</Link>
					{name && <div className="text-lg font-semibold truncate">{name}</div>}
				</h2>
				{owner && user && owner === user && (
					<div className="justify-end card-actions mt-2">
						<button className="btn btn-primary">Sell</button>
					</div>
				)}
				{/* <div className="px-6 py-2">
						{price && <div>{ethers.utils.formatEther(BigNumber.from(price))}Ξ</div>}
					</div> */}
			</div>
		</div>
	);
};

export default Asset;
