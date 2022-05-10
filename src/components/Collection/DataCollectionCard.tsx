import { ABI } from 'constants/abis';
import { SupportedChainId } from 'constants/chains';
import customLogos from 'constants/customLogos';
import { DEFAULT_CHAIN } from 'constants/misc';
import useProviders from 'hooks/useProviders';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollectionInfo, selectCollectionInfo } from 'state/reducers/collections';
import CollectionCard from './CollectionCard';

export interface DataCollectionCardProps {
	address: string;
}

const DataCollectionCard: React.FC<DataCollectionCardProps> = ({ address }) => {
	const chainIdNormalised: SupportedChainId = DEFAULT_CHAIN;

	const baseProvider = useProviders()[chainIdNormalised as SupportedChainId];
	const dispatch = useDispatch();

	const info = useSelector(selectCollectionInfo(chainIdNormalised, address));
	if (!info)
		dispatch(
			fetchCollectionInfo({
				address,
				chainId: chainIdNormalised,
				provider: baseProvider,
				contractABI: ABI.EIP721
			})
		);

	return (
		<CollectionCard contract={address} name={info?.name} image={`/assets/collections/${customLogos[chainIdNormalised][address.toLowerCase()]}`} />
	);
};

export default DataCollectionCard;
