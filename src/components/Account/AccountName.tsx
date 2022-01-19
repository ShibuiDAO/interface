import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useENSName from 'hooks/useENSName';
import React from 'react';
import { ExplorerType, formatExplorerLink, shortenHex } from 'utils/utils';

export interface AccountNameProps {
	className?: string;
}

const AccountName: React.FC<AccountNameProps> = ({ className }) => {
	const { chainId, account } = useActiveWeb3React();
	const ens = useENSName(account);

	if (!account) return null;

	return (
		<>
			<a href={formatExplorerLink(ExplorerType.Account, [chainId!, account])} target="_blank" rel="noopener noreferrer" className={className}>
				{ens || shortenHex(account, 4)}
			</a>
		</>
	);
};

export default AccountName;
