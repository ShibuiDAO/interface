import CollectionAssets from 'components/Collection/CollectionAssets';
import Offset from 'components/Navbar/Offset';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const CollectionDisplay: NextPage = () => {
	const router = useRouter();

	const address = Array.isArray(router.query.address) ? router.query.address[0] : router.query.address;
	const addressNormalised = address?.toLowerCase();

	return (
		<div>
			<Offset />
			<div className="container">
				<div className="flex flex-wrap align-middle justify-center gap-8">
					<CollectionAssets address={addressNormalised || ''} />
				</div>
			</div>
		</div>
	);
};

export default CollectionDisplay;
