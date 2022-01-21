import { UserRejectedRequestError } from '@web3-react/walletconnect-connector';
import { walletConnect } from 'connectors';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import React from 'react';

const WalletConnectConnect: React.FC = () => {
	const { error, activate, setError } = useActiveWeb3React();

	if (error) {
		return null;
	}

	return (
		<>
			<div className="m-2 min-w-full">
				<div className="dark:text-gray-50 border dark:border-gray-600 dark:border-opacity-40 dark:bg-gray-800 transition-colors duration-300 ease-in-out dark:hover:bg-pink-900 dark:hover:border-pink-800 p-4 m-auto rounded-lg w-full flex gap-4">
					<button
						className="flex-1"
						onClick={() => {
							activate(walletConnect, undefined, true).catch((_error) => {
								// ignore the error if it's a user rejected request
								if (!(_error instanceof UserRejectedRequestError)) {
									setError(_error);
								}
							});
						}}
					>
						<div className="flex">WalletConnect</div>
					</button>

					<div className="right-0 flex-none">
						<img src="/assets/wallets/walletConnect.svg" alt="WalletConnect logo." width={24} height={24} />
					</div>
				</div>
			</div>
		</>
	);
};

export default WalletConnectConnect;
