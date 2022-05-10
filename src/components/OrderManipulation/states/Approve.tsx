import { SupportedChainId } from 'constants/chains';
import { ERC721_EXCHANGE } from 'constants/contracts';
import { DEFAULT_CHAIN } from 'constants/misc';
import useProviders from 'hooks/useProviders';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApprovalStatus, OrderDirection, selectOrderingStatus, setApprovalForAll, updateCurrentOrderDirection } from 'state/reducers/orders';
import { useAccount, useSigner } from 'wagmi';

const Approve: React.FC = () => {
	const { data: account } = useAccount();
	const { data: signer } = useSigner();

	const chainIdNormalised: SupportedChainId = DEFAULT_CHAIN;
	const accountFormatted = account?.address?.toLowerCase() || '';

	const baseProvider = useProviders()[chainIdNormalised];
	const dispatch = useDispatch();
	const order = useSelector(selectOrderingStatus());

	useEffect(() => {
		if (!accountFormatted) return;

		dispatch(
			fetchApprovalStatus({
				contract: order.contract,
				operator: ERC721_EXCHANGE[chainIdNormalised],
				owner: accountFormatted,
				provider: baseProvider
			})
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (order.approved === true) dispatch(updateCurrentOrderDirection(OrderDirection.BOOK));

	return (
		<button
			disabled={!signer}
			onClick={() => {
				dispatch(
					setApprovalForAll({
						contract: order.contract,
						operator: ERC721_EXCHANGE[chainIdNormalised],
						signer: signer!
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
