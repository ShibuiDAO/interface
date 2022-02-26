import { ABI } from 'constants/abis';
import { SupportedChainId } from 'constants/chains';
import { DEFAULT_CHAIN } from 'constants/misc';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useProviders from 'hooks/useProviders';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollectionInfo, selectCollectionInfo } from 'state/reducers/collections';
import CollectionCard from './CollectionCard';

export interface DataCollectionCardProps {
	address: string;
}

const DataCollectionCard: React.FC<DataCollectionCardProps> = ({ address }) => {
	const { chainId, library, account } = useActiveWeb3React();
	const chainIdNormalised: SupportedChainId = chainId || DEFAULT_CHAIN;
	const baseProvider = useProviders()[chainId as SupportedChainId];
	const dispatch = useDispatch();

	const info = useSelector(selectCollectionInfo(chainIdNormalised, address));
	if (!info)
		dispatch(
			fetchCollectionInfo({
				address,
				chainId: chainIdNormalised,
				provider: account && library ? library : baseProvider,
				contractABI: ABI.EIP721
			})
		);

	return <CollectionCard contract={address} name={info?.name} />;
};

export default DataCollectionCard;
