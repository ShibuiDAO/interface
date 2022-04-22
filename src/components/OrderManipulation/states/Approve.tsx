import { SupportedChainId } from 'constants/chains';
import { ERC721_EXCHANGE } from 'constants/contracts';
import { DEFAULT_CHAIN } from 'constants/misc';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useProviders from 'hooks/useProviders';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApprovalStatus, OrderDirection, selectOrderingStatus, setApprovalForAll, updateCurrentOrderDirection } from 'state/reducers/orders';

const Approve: React.FC = () => {
	const { library, account, chainId } = useActiveWeb3React();
	const chainIdNormalised: SupportedChainId = chainId || DEFAULT_CHAIN;

	const baseProvider = useProviders()[chainIdNormalised];
	const dispatch = useDispatch();
	const order = useSelector(selectOrderingStatus());

	useEffect(() => {
		if (!library || !account) return;

		dispatch(
			fetchApprovalStatus({
				contract: order.contract,
				operator: ERC721_EXCHANGE[chainIdNormalised],
				owner: account,
				provider: library || baseProvider
			})
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (order.approved === true) dispatch(updateCurrentOrderDirection(OrderDirection.BOOK));

	return (
		<button
			disabled={!library}
			onClick={() => {
				dispatch(
					setApprovalForAll({
						contract: order.contract,
						operator: ERC721_EXCHANGE[chainIdNormalised],
						provider: library!
					})
				);
			}}
			className="h-full w-full cursor-pointer select-none rounded-md bg-lights-300 px-3 py-2 text-sm font-medium normal-case hover:bg-lights-400"
		>
			<div className="text-center text-lg font-bold">Approve</div>
		</button>
	);
};

export default Approve;
