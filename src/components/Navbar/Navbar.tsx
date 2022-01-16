import AccountName from 'components/Account/AccountName';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setConnectingStatus } from 'state/reducers/user';

const Navbar: React.FC = () => {
	const dispatch = useDispatch();
	const { active } = useActiveWeb3React();

	return (
		<>
			<nav className="w-full fixed z-20">
				<div className="border-b-2 dark:border-gray-800 dark:bg-gray-900 dark:text-white font-semibold">
					<div className="w-full mx-auto px-8 py-2">
						<div className="relative flex items-center justify-between h-12">
							{/* Left */}
							<div className="flex-1 flex pl-0 items-stretch justify-start">
								<div className="flex-shrink-0 flex items-center">
									<Link href="/">Inventory</Link>
								</div>
								{/* <div className="hidden md:block md:ml-6">
									<div className="flex space-x-4">
										<NavBarItem href="/" className={`${navItemStyle}`} content={t('paths.home')} />
										<NavBarItem href="/zemljevid" className={`${navItemStyle}`} content={t('paths.map')} />
									</div>
								</div> */}
							</div>

							{/* Right */}
							<div className="right-0 flex items-center static inset-auto ml-6 pr-0">
								<div className="w-full block ml-6 content-center">
									<div className="flex space-x-4 justify-end">
										<button onClick={() => dispatch(setConnectingStatus(true))} hidden={active}>
											<span className="px-3 py-2 duration-150 text-sm font-medium select-none cursor-pointer rounded-md">
												Connect wallet
											</span>
										</button>
										<div hidden={!active}>
											<AccountName />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
