import getConfig from 'next/config';
import { useRouter } from 'next/router';
import React from 'react';

const { publicRuntimeConfig } = getConfig();

const AppBar: React.FC = () => {
	const router = useRouter();

	return (
		<>
			{false && router.pathname.startsWith('/app') && (
				<>
					<div className="border-b-2 px-4 text-xxs uppercase dark:border-darks-200 dark:bg-darks-300 dark:text-gray-400">
						<div className="flex justify-between whitespace-nowrap py-1 font-bold">ShibuiNFT App v{publicRuntimeConfig.version}</div>
					</div>
				</>
			)}
		</>
	);
};

export default AppBar;
