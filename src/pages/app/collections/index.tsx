import { useQuery } from '@apollo/client';
import { EIP721Response } from 'client';
import { ChainSubgraphSets, generateEIP721ContractsQuery } from 'client/queries';
import DataCollectionCard from 'components/Collection/DataCollectionCard';
import Offset from 'components/Navbar/Offset';
import { SupportedChainId } from 'constants/chains';
import { COLLECTION_REFRESH_INTERVAL, DEFAULT_CHAIN } from 'constants/misc';
import { NextPage } from 'next';
import React from 'react';
import { Else, If } from 'react-if';
import { filterExlusions } from 'utils/filtering';

const CollectionsListPage: NextPage = () => {
	const chainIdNormalised: SupportedChainId = DEFAULT_CHAIN;
	const [EIP721Subgraph] = ChainSubgraphSets[chainIdNormalised];

	const { data: collectionsData } = useQuery<EIP721Response<'erc721Contracts'>>(generateEIP721ContractsQuery(chainIdNormalised), {
		context: { subgraph: EIP721Subgraph },
		fetchPolicy: 'no-cache',
		pollInterval: COLLECTION_REFRESH_INTERVAL
	});

	return (
		<>
			<Offset />
			<div className="py-8 pb-20">
				<div className="container">
					<div>
						<h1 className="text-3xl font-semibold dark:text-white">Explore Collections</h1>
					</div>
					<div className="flex flex-wrap justify-center gap-4 pt-10 align-middle">
						<If condition={!collectionsData || !collectionsData.erc721Contracts}>
							<Else>
								{collectionsData?.erc721Contracts
									? collectionsData!.erc721Contracts
											.filter(filterExlusions(chainIdNormalised))
											.map((collection) => <DataCollectionCard key={collection.id} address={collection.id} />)
									: null}
							</Else>
						</If>
					</div>
				</div>
			</div>
		</>
	);
};

export default CollectionsListPage;
