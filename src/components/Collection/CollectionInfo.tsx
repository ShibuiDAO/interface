import { ABI } from 'constants/abis';
import { SupportedChainId } from 'constants/chains';
import { DEFAULT_CHAIN } from 'constants/misc';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useProviders from 'hooks/useProviders';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollectionInfo, selectCollectionInfo } from 'state/reducers/collections';

export interface CollectionInfoProps {
	address: string;
}

const CollectionInfo: React.FC<CollectionInfoProps> = ({ address }) => {
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

	return (
		<>
			{info?.name} - {info?.totalSupply}
		</>
	);
};

export default CollectionInfo;
