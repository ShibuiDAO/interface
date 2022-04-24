import { BigNumber } from 'ethers';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useMounted from 'hooks/useMounted';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearOrder, executeSellOrderTxw, OrderDirection, selectOrderingStatus } from 'state/reducers/orders';

const Exercise: React.FC = () => {
	const { library, account, chainId } = useActiveWeb3React();
	const dispatch = useDispatch();
	const order = useSelector(selectOrderingStatus<OrderDirection.EXERCISE>());

	const mounted = useMounted();

	useEffect(() => {
		if (!mounted || !chainId || !library) return;

		dispatch(
			executeSellOrderTxw({
				chainId,
				library: library!,
				data: {
					seller: order.seller!,
					tokenContractAddress: order.contract,
					tokenId: BigNumber.from(order.identifier),
					expiration: BigNumber.from(order.expiration),
					price: BigNumber.from(order.price),
					recipient: account!
				}
			})
		);
		dispatch(clearOrder());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <></>;
};

export default Exercise;
