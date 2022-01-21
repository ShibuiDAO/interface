import { walletlink } from 'connectors';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import React from 'react';
import { noop } from 'utils/utils';

const WalletLinkConnect: React.FC = () => {
	const { error, activate } = useActiveWeb3React();

	if (error) {
		return null;
	}

	return (
		<>
			<div className="m-2 min-w-full">
				<button
					className="dark:text-gray-50 border dark:border-gray-600 dark:border-opacity-40 dark:bg-gray-800 transition-colors duration-300 ease-in-out dark:hover:bg-pink-900 dark:hover:border-pink-800 p-4 m-auto rounded-lg w-full flex gap-4"
					onClick={() => {
						activate(walletlink, undefined, true).catch(noop);
					}}
				>
					<div className="flex-1">
						<div className="flex">Coinbase Wallet</div>
					</div>
					<div className="right-0 flex-none">
						<img src="/assets/wallets/coinbaseWallet.svg" alt="Coinbase logo." width={24} height={24} />
					</div>
				</button>
			</div>
		</>
	);
};

export default WalletLinkConnect;
