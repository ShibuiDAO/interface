import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Case, Default, Switch } from 'react-if';
import AppBar from './AppBar';

const Navbar: React.FC = () => {
	const router = useRouter();

	return (
		<>
			<AppBar />
			<header className="sticky top-0 z-20 w-full">
				<div className="border-b-2 font-semibold dark:border-darks-200 dark:bg-darks-400 dark:text-white">
					<div className="container mx-auto px-8 py-2">
						<div className="relative flex h-12 items-center justify-between">
							{/* Left */}
							<div className="flex flex-1 items-stretch justify-start pl-0">
								<div className="flex flex-shrink-0 items-center">
									<Link href="/">
										<img src="/logo.svg" alt="ShibuiDAO logo." />
									</Link>
								</div>
							</div>

							{/* Right */}
							<div className="static inset-auto right-0 ml-6 flex items-center pr-0">
								<div className="ml-6 block w-full content-center">
									<div className="flex justify-end space-x-4">
										<Switch>
											<Case condition={!router.pathname.startsWith('/app')}>
												<Link href={'/app'}>
													<div className="btn cursor-pointer select-none rounded-md bg-lights-300 px-3 py-2 text-sm font-medium normal-case hover:bg-lights-400">
														Launch app
													</div>
												</Link>
											</Case>
											<Default>
												<ConnectButton />
											</Default>
										</Switch>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Navbar;
