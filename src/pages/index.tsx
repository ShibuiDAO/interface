import Offset from 'components/Navbar/Offset';
import { BigNumber } from 'ethers';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useConnectionActive from 'hooks/useConnectionActive';
import { NextPage } from 'next';
import React from 'react';
import { useDispatch } from 'react-redux';
import { createSellOrder } from 'state/reducers/orders';

const Index: NextPage = () => {
	const { library, chainId } = useActiveWeb3React();
	const isConnected = useConnectionActive();
	const dispatch = useDispatch();

	return (
		<div>
			<Offset />
			{isConnected && chainId && library ? (
				<>
					<h1>Hello</h1>
					<button
						onClick={() => {
							dispatch(
								createSellOrder({
									chainId,
									library,
									data: {
										tokenContractAddress: '0x13C58F81e0B91DA9e2297daDd6CB5d51Daa2Fd83',
										tokenId: 92,
										expiration: BigNumber.from(new Date().getTime() * 2),
										price: BigNumber.from('10000000000000000') // 0.01 ETH
									}
								})
							);
						}}
					>
						Yeet
					</button>
				</>
			) : null}
		</div>
	);
};

export default Index;
