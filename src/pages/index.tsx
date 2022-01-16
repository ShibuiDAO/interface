import Offset from 'components/Navbar/Offset';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useConnectionActive from 'hooks/useConnectionActive';
import { NextPage } from 'next';
import React from 'react';

const Index: NextPage = () => {
	const { library, chainId } = useActiveWeb3React();
	const isConnected = useConnectionActive();

	return (
		<div>
			<Offset />
			{isConnected && chainId && library ? (
				<>
					<h1>Hello</h1>
				</>
			) : null}
		</div>
	);
};

export default Index;
