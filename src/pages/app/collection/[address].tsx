import { useQuery } from '@apollo/client';
import { EIP721Response } from 'client';
import { ChainSubgraphSets, generateEIP721CollectionExistsQuery } from 'client/queries';
import CollectionAssets from 'components/Collection/CollectionAssets';
import CollectionFilters from 'components/Collection/CollectionFilters';
import CollectionSpecificsInfo from 'components/Collection/CollectionSpecificsInfo';
import Offset from 'components/Navbar/Offset';
import ProtectedMultiSourceContentDisplay from 'components/ProtectedMultiSourceContentDisplay';
import { SupportedChainId } from 'constants/chains';
import customLogos from 'constants/customLogos';
import { DEFAULT_CHAIN } from 'constants/misc';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useForceConnectMenu from 'hooks/useForceConnectMenu';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const CollectionDisplayPage: NextPage = () => {
	const router = useRouter();
	useForceConnectMenu();

	const address = Array.isArray(router.query.address) ? router.query.address[0] : router.query.address;
	const addressNormalised = (address || '').toLowerCase();

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
			<div className="relative w-full bg-white">
				<img src={'/assets/background/collection-bg.jpeg'} alt="Collections cover" className="h-48 w-full object-cover" />
				<figure className="absolute -translate-x-2/4 translate-y-0 p-2 pr-5" style={{ bottom: '-60px', left: '50%' }}>
					<ProtectedMultiSourceContentDisplay
						src={`/assets/collections/${customLogos[chainIdNormalised][addressNormalised]}` || ''}
						fallback="/logo_inverted_spaced.svg"
						className="max-h-[7.25rem] min-w-[7.25rem] max-w-[7.25rem] rounded-full dark:bg-darks-400"
					/>
				</figure>
			</div>
			<div className="mt-4 py-8 pb-20">
				<div className="container">
					<CollectionSpecificsInfo address={addressNormalised || ''} />
					<CollectionFilters className="pt-11" />
					<div className="flex flex-wrap justify-center gap-5 pt-11">
						<CollectionAssets address={addressNormalised || ''} />
					</div>
				</div>
			</div>
		</>
	);
};

export default CollectionDisplayPage;
