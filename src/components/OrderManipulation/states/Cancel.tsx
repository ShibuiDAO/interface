import { BigNumber } from 'ethers';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useMounted from 'hooks/useMounted';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cancelSellOrder, clearOrder, OrderDirection, selectOrderingStatus } from 'state/reducers/orders';

const Cancel: React.FC = () => {
	const { library, chainId } = useActiveWeb3React();
	const dispatch = useDispatch();
	const order = useSelector(selectOrderingStatus<OrderDirection.CANCEL>());

	const mounted = useMounted();

	useEffect(() => {
		if (!mounted || !chainId || !library) return;

		dispatch(
			cancelSellOrder({
				chainId,
				library: library!,
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
