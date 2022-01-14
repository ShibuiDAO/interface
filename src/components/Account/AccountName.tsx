import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import React from 'react';
import { ExplorerType, formatExplorerLink, shortenHex } from 'utils/utils';

const AccountName: React.FC = () => {
	const { chainId, account } = useActiveWeb3React();

	if (!account) return null;

	return (
		<>
			<a href={formatExplorerLink(ExplorerType.Account, [chainId!, account])} target="_blank" rel="noopener noreferrer">
				{shortenHex(account, 4)}
			</a>
		</>
	);
};

export default AccountName;
