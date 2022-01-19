import CollectionAssets from 'components/Collection/CollectionAssets';
import Offset from 'components/Navbar/Offset';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setConnectingStatus } from 'state/reducers/user';

const CollectionDisplay: NextPage = () => {
	const { active } = useActiveWeb3React();
	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		if (!active) dispatch(setConnectingStatus(true));
	}, [active, dispatch]);

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
