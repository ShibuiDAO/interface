import { torus } from 'connectors';
import { TORUS_USER_CLOSED_PROMPT_MESSAGE } from 'constants/misc';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import React from 'react';

const TorusConnect: React.FC = () => {
	const { activate, setError } = useActiveWeb3React();

	return (
		<>
			<div className="m-2 min-w-full">
				<button
					className="m-auto flex w-full gap-4 rounded-lg border p-4 transition-colors duration-300 ease-in-out dark:border-gray-600 dark:border-opacity-40 dark:bg-gray-800 dark:text-gray-50 dark:hover:border-pink-800 dark:hover:bg-pink-900"
					onClick={() => {
						activate(torus, undefined, true).catch((_error) => {
							if (_error?.message && typeof _error.message === 'string' && _error.message.includes(TORUS_USER_CLOSED_PROMPT_MESSAGE))
								return;
							setError(_error);
						});
					}}
				>
					<div className="flex-1">
						<div className="flex">Torus</div>
					</div>
					<div className="right-0 flex-none">
						<img src="/assets/wallets/dark-torus.svg" alt="Coinbase logo." width={24} height={24} />
					</div>
				</button>
			</div>
		</>
	);
};

export default TorusConnect;
