import ProtectedMultiSourceContentDisplay from 'components/ProtectedMultiSourceContentDisplay';
import Link from 'next/link';
import React from 'react';

export interface CollectionCardProps {
	contract: string;
	name?: string;
	image?: string;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ image, name, contract }) => {
	const collectionName = name ?? '???';

	// TODO: Enable this once FE-59 is complete
	// const lineClamp = collectionName?.length > 15 ? 'line-clamp-2' : 'line-clamp-3';

	return (
		<Link href={`/app/collection/${contract}`} passHref={true}>
			<a href="/">
				{/* eslint-disable-next-line prettier/prettier */}
				<div className="card-bordered card card-side my-1 max-h-[8.875rem] min-h-[8.875rem] min-w-[23rem] max-w-[23rem] shadow-lg  dark:border-darks-100 dark:bg-darks-100 dark:text-black">
					<div className="grid grid-cols-2 grid-rows-1">
						<figure className="m-auto p-2 pr-5">
							<ProtectedMultiSourceContentDisplay
								src={image || ''}
								fallback="/logo_inverted_spaced.svg"
								className="max-h-[7.25rem] min-w-[7.25rem] max-w-[7.25rem] rounded-full dark:bg-darks-400"
							/>
						</figure>
						<div className="py-7">
							<h2 className="text-xl font-bold">{collectionName}</h2>
							{/* TODO: Enable this once FE-59 is complete */}
							{/* <p className={lineClamp}>very long long description that can go oversized of the card</p> */}
						</div>
					</div>
				</div>
			</a>
		</Link>
	);
};

export default CollectionCard;
