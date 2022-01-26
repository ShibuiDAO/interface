import CollectionAssets from 'components/Collection/CollectionAssets';
import Offset from 'components/Navbar/Offset';
import useForceConnectMenu from 'hooks/useForceConnectMenu';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const CollectionDisplay: NextPage = () => {
	const router = useRouter();
	useForceConnectMenu();

	const address = Array.isArray(router.query.address) ? router.query.address[0] : router.query.address;
	const addressNormalised = address?.toLowerCase();

	return (
		<>
			<Offset />
			<div className="py-8">
				<div className="container">
					<div className="flex flex-wrap justify-center gap-8 align-middle">
						<CollectionAssets address={addressNormalised || ''} />
					</div>
				</div>
			</div>
		</>
	);
};

export default CollectionDisplay;
