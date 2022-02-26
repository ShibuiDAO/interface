import ProtectedMultiSourceContentDisplay from 'components/ProtectedMultiSourceContentDisplay';
import Link from 'next/link';
import React from 'react';

export interface CollectionCardProps {
	contract: string;
	name?: string;
	image?: string;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ image, name, contract }) => {
	return (
		<Link href={`/app/collection/${contract}`} passHref={true}>
			<a href="/">
				<div className="card-bordered card card-side my-1 max-h-[8.875rem] min-h-[8.875rem] min-w-[23rem] max-w-[23rem] shadow-lg hover:translate-x-2 hover:translate-y-2 hover:transform-gpu dark:border-darks-100 dark:bg-darks-100 dark:text-black">
					<div className="grid grid-cols-2 grid-rows-1">
						<figure className="m-auto p-2 pr-5">
							<ProtectedMultiSourceContentDisplay
								src={image || 'http://t.t'}
								fallback="/logo_inverted_spaced.svg"
								className="max-h-[7.25rem] min-w-[7.25rem] max-w-[7.25rem] rounded-full dark:bg-darks-400"
							/>
						</figure>
						<div className="py-7">
							<h2 className="text-xl font-bold">{name || '???'}</h2>
						</div>
					</div>
				</div>
			</a>
		</Link>
	);
};

export default CollectionCard;
