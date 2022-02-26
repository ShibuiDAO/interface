import { useQuery } from '@apollo/client';
import { EIP721Response } from 'client';
import { ChainSubgraphSets, generateEIP721CollectionExistsQuery } from 'client/queries';
import CollectionAssets from 'components/Collection/CollectionAssets';
import CollectionFilters from 'components/Collection/CollectionFilters';
import CollectionSpecificsInfo from 'components/Collection/CollectionSpecificsInfo';
import Offset from 'components/Navbar/Offset';
import { SupportedChainId } from 'constants/chains';
import { DEFAULT_CHAIN } from 'constants/misc';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useForceConnectMenu from 'hooks/useForceConnectMenu';
import type { GetStaticPaths, NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const CollectionDisplay: NextPage = () => {
	const router = useRouter();
	useForceConnectMenu();

	const address = Array.isArray(router.query.address) ? router.query.address[0] : router.query.address;
	const addressNormalised = address?.toLowerCase();

	const { chainId } = useActiveWeb3React();
	const chainIdNormalised: SupportedChainId = chainId || DEFAULT_CHAIN;

	const [EIP721Subgraph] = ChainSubgraphSets[chainIdNormalised];

	const { data: collectionData, loading: collectionLoading } = useQuery<EIP721Response<'erc721Contract'>>(
		generateEIP721CollectionExistsQuery(chainIdNormalised),
		{
			variables: { contract: addressNormalised },
			context: { subgraph: EIP721Subgraph },
			fetchPolicy: 'no-cache'
		}
	);

	if (!collectionLoading && collectionData?.erc721Contract === null && typeof window !== 'undefined') {
		void router.push('/404');
		return null;
	}

	return (
		<>
			<Offset />
			<div className="py-8 pb-20">
				<div className="container">
					<CollectionSpecificsInfo address={addressNormalised || ''} />
					<CollectionFilters className="pt-11" />
					<div className="flex flex-wrap justify-center gap-4 pt-11 align-middle">
						<CollectionAssets address={addressNormalised || ''} />
					</div>
				</div>
			</div>
		</>
	);
};

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps = async () => {
	return {
		props: {}
	};
};

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: 'blocking'
	};
};

export default CollectionDisplay;
