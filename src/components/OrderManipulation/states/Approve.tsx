import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import { SupportedChainId } from 'constants/chains';
import { ERC721_EXCHANGE } from 'constants/contracts';
import { DEFAULT_CHAIN } from 'constants/misc';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useProviders from 'hooks/useProviders';
import React, { Fragment, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	clearOrder,
	fetchApprovalStatus,
	OrderDirection,
	selectOrderingStatus,
	setApprovalForAll,
	updateCurrentOrderDirection
} from 'state/reducers/orders';

const Approve: React.FC = () => {
	const { library, account, chainId } = useActiveWeb3React();
	const chainIdNormalised: SupportedChainId = chainId || DEFAULT_CHAIN;

	const baseProvider = useProviders()[chainIdNormalised];
	const dispatch = useDispatch();
	const order = useSelector(selectOrderingStatus());

	useEffect(() => {
		if (!library || !account) return;

		dispatch(
			fetchApprovalStatus({
				contract: order.contract,
				operator: ERC721_EXCHANGE[chainIdNormalised],
				owner: account,
				provider: library || baseProvider
			})
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (order.approved === true) dispatch(updateCurrentOrderDirection(OrderDirection.BOOK));

	const closeButtonRef = useRef(null);

	return (
		<>
			<Transition.Root show={order.ordering} as={Fragment}>
				<Dialog as="div" className="fixed min-h-screen z-30 inset-0 overflow-y-auto m-auto min-w-max" onClose={() => dispatch(clearOrder())}>
					<div className="flex min-h-screen w-full">
						<div className="flex items-end justify-center m-auto text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Dialog.Overlay className="fixed inset-0" />
							</Transition.Child>
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
								enterTo="opacity-100 translate-y-0 sm:scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 translate-y-0 sm:scale-100"
								leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							>
								<div className="z-40 inline-block text-left overflow-hidden shadow-xl transform transition-all align-middle">
									<div className="dark:text-white dark:bg-darks-400 border dark:border-lights-200 border-transparent rounded-2xl p-4">
										<div className="flex items-start">
											<div className="mt-0 text-left">
												<Dialog.Title as="span" className="w-full text-lg leading-6 font-bold">
													Approve Exchange spending
													<button
														type="button"
														className="float-right"
														onClick={() => dispatch(clearOrder())}
														ref={closeButtonRef}
													>
														<FontAwesomeIcon icon={faTimes} />
													</button>
												</Dialog.Title>
												<div className="mt-2 px-8">
													<button
														disabled={!library}
														onClick={() => {
															dispatch(
																setApprovalForAll({
																	contract: order.contract,
																	operator: ERC721_EXCHANGE[chainIdNormalised],
																	provider: library!
																})
															);
														}}
													>
														Approve
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
};

export default Approve;
