import { SupportedChainId } from 'constants/chains';
import { DEFAULT_CHAIN } from 'constants/misc';
import { BigNumber } from 'ethers';
import useMounted from 'hooks/useMounted';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearOrder, executeSellOrder, OrderDirection, selectOrderingStatus } from 'state/reducers/orders';
import { useAccount, useSigner } from 'wagmi';

const Exercise: React.FC = () => {
	const { data: account } = useAccount();
	const { data: signer } = useSigner();

	const chainIdNormalised: SupportedChainId = DEFAULT_CHAIN;

	const dispatch = useDispatch();
	const order = useSelector(selectOrderingStatus<OrderDirection.EXERCISE>());

	const mounted = useMounted();

	useEffect(() => {
		if (!mounted || !signer || !account || !account.address) return;

		dispatch(
			executeSellOrder({
				chainId: chainIdNormalised,
				signer,
				data: {
					seller: order.seller!,
					tokenContractAddress: order.contract,
					tokenId: BigNumber.from(order.identifier),
					expiration: BigNumber.from(order.expiration),
					price: BigNumber.from(order.price),
					recipient: account.address
				}
			})
		);
		dispatch(clearOrder());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <></>;
};

export default Exercise;
