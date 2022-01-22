import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useRef } from 'react';

export interface GenericModalProps {
	show: boolean;
	onDialogClose: (...args: any) => any;
	modalTitle?: string;
	onTitleCloseClick: (...args: any) => any;
}

const GenericModal: React.FC<GenericModalProps> = ({ show, onDialogClose, modalTitle, onTitleCloseClick, children }) => {
	const closeButtonRef = useRef(null);

	return (
		<Transition.Root show={show} as={Fragment}>
			<Dialog as="div" className="fixed min-h-screen z-40 inset-0 overflow-y-auto m-auto min-w-max" onClose={onDialogClose}>
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
							<div className="z-50 inline-block text-left overflow-hidden shadow-xl transform transition-all align-middle">
								<div className="dark:text-white dark:bg-darks-400 border dark:border-lights-300 rounded-2xl border-transparent p-4">
									<div className="flex items-start">
										<div className="mt-0 text-left">
											<Dialog.Title as="span" className="w-full text-lg leading-6 font-bold">
												{modalTitle}
												<button type="button" className="float-right" onClick={onTitleCloseClick} ref={closeButtonRef}>
													<FontAwesomeIcon icon={faTimes} />
												</button>
											</Dialog.Title>
											<div className="mt-2 px-8">{children}</div>
										</div>
									</div>
								</div>
							</div>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default GenericModal;
