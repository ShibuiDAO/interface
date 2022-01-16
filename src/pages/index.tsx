import Offset from 'components/Navbar/Offset';
import useConnectionActive from 'hooks/useConnectionActive';
import { NextPage } from 'next';
import React from 'react';

const Index: NextPage = () => {
	const isConnected = useConnectionActive();

	return (
		<div>
			<Offset />
			{isConnected ? (
				<>
					<h1>Hello</h1>
				</>
			) : null}
		</div>
	);
};

export default Index;
