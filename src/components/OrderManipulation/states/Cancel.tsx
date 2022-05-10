import { SupportedChainId } from 'constants/chains';
import { DEFAULT_CHAIN } from 'constants/misc';
import { BigNumber } from 'ethers';
import useMounted from 'hooks/useMounted';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cancelSellOrder, clearOrder, OrderDirection, selectOrderingStatus } from 'state/reducers/orders';
import { useSigner } from 'wagmi';

const Cancel: React.FC = () => {
	const { data: signer } = useSigner();

	const chainIdNormalised: SupportedChainId = DEFAULT_CHAIN;

	const dispatch = useDispatch();
	const order = useSelector(selectOrderingStatus<OrderDirection.CANCEL>());

	const mounted = useMounted();

	useEffect(() => {
		if (!mounted || !signer) return;

		dispatch(
			cancelSellOrder({
				chainId: chainIdNormalised,
				signer,
				data: {
					tokenContractAddress: order.contract,
					tokenId: BigNumber.from(order.identifier)
				}
			})
		);
		dispatch(clearOrder());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <></>;
};

export default Cancel;
