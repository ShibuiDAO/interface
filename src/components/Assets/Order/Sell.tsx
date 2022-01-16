import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearOrder, selectOrderingStatus } from 'state/reducers/orders';
import SellForm from './SellForm';

const Sell: React.FC = () => {
	const dispatch = useDispatch();
	const order = useSelector(selectOrderingStatus);

	const closeButtonRef = useRef(null);

	return (
		<>
			<Transition.Root show={order.ordering} as={Fragment}>
				<Dialog
					as="div"
					className="fixed min-h-screen z-30 inset-0 overflow-y-auto m-auto min-w-max"
					initialFocus={closeButtonRef}
					onClose={() => dispatch(clearOrder())}
				>
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
								<div className="z-40 inline-block rounded-md text-left overflow-hidden shadow-xl transform transition-all align-middle">
									<div className="dark:text-white dark:bg-gray-900 border dark:border-gray-700 border-transparent p-4">
										<div className="flex items-start">
											<div className="mt-0 text-left">
												<Dialog.Title as="span" className="w-full text-lg leading-6 font-bold">
													Sell NFT
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
													<SellForm contract={order.contract} identifier={order.identifier} />
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

export default Sell;
