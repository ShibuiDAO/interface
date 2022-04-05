import { UserRejectedRequestError } from '@web3-react/walletconnect-connector';
import { walletConnect } from 'connectors';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import React from 'react';

const WalletConnectConnect: React.FC = () => {
	const { activate, setError } = useActiveWeb3React();

	return (
		<>
			<div className="m-2 min-w-full">
				<button
					className="m-auto flex w-full gap-4 rounded-lg border p-4 transition-colors duration-300 ease-in-out dark:border-gray-600 dark:border-opacity-40 dark:bg-gray-800 dark:text-gray-50 dark:hover:border-pink-800 dark:hover:bg-pink-900"
					onClick={() => {
						activate(walletConnect, undefined, true).catch((_error) => {
							// ignore the error if it's a user rejected request
							if (!(_error instanceof UserRejectedRequestError)) {
								setError(_error);
							}
						});
					}}
				>
					<div className="flex-1">
						<div className="flex">WalletConnect</div>
					</div>
					<div className="right-0 flex-none">
						<img src="/assets/wallets/walletConnect.svg" alt="WalletConnect logo." width={24} height={24} />
					</div>
				</button>
			</div>
		</>
	);
};

export default WalletConnectConnect;
