import CollectionAssets from 'components/Collection/CollectionAssets';
import Offset from 'components/Navbar/Offset';
import useConnectionActive from 'hooks/useConnectionActive';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const CollectionDisplay: NextPage = () => {
	const router = useRouter();
	const isConnected = useConnectionActive();

	const address = Array.isArray(router.query.address) ? router.query.address[0] : router.query.address;
	const addressNormalised = address?.toLowerCase();

	return (
		<div>
			<Offset />
			{isConnected ? (
				<>
					<h1>Hello</h1>
					<div className="container">
						<div className="flex flex-wrap gap-8">
							<CollectionAssets address={addressNormalised || ''} />
						</div>
					</div>
				</>
			) : null}
		</div>
	);
};

export default CollectionDisplay;
