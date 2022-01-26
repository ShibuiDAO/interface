import MetaMaskOnboarding from '@metamask/onboarding';
import { UserRejectedRequestError } from '@web3-react/injected-connector';
import { metamask } from 'connectors';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectEagerAttempt } from 'state/reducers/user';

const MetamaskConnect: React.FC = () => {
	const { active, error, activate, setError } = useActiveWeb3React();
	// initialize metamask onboarding
	const onboarding = useRef<MetaMaskOnboarding>();
	// manage connecting state for injected connector
	const triedToEagerConnect = useSelector(selectEagerAttempt);

	useLayoutEffect(() => {
		onboarding.current = new MetaMaskOnboarding();
	}, []);
	useEffect(() => {
		if (active || error) {
			onboarding.current?.stopOnboarding();
		}
	}, [active, error]);

	if (error || !triedToEagerConnect) {
		return null;
	}

	return (
		<>
			<div className="m-2 min-w-full">
				<button
					className="m-auto flex w-full gap-4 rounded-lg border p-4 transition-colors duration-300 ease-in-out dark:border-gray-600 dark:border-opacity-40 dark:bg-gray-800 dark:text-gray-50 dark:hover:border-pink-800 dark:hover:bg-pink-900"
					onClick={() => {
						if (!MetaMaskOnboarding.isMetaMaskInstalled()) return onboarding.current?.startOnboarding();

						activate(metamask, undefined, true).catch((_error) => {
							// ignore the error if it's a user rejected request
							if (!(_error instanceof UserRejectedRequestError)) {
								setError(_error);
							}
						});
					}}
				>
					<div className="flex-1">
						<div className="flex">
							<span>{MetaMaskOnboarding.isMetaMaskInstalled() ? 'Metamask' : 'Install Metamask'}</span>
						</div>
					</div>
					<div className="right-0 flex-none">
						<img src="/assets/wallets/metamask.png" alt="Metamask wallet logo." width={24} height={24} />
					</div>
				</button>
			</div>
		</>
	);
};

export default MetamaskConnect;
