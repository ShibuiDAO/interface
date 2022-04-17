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
			<Dialog as="div" className="fixed inset-0 z-40 m-auto min-h-screen min-w-max overflow-y-auto" onClose={onDialogClose}>
				<div className="flex min-h-screen w-full">
					<div className="m-auto flex items-end justify-center text-center">
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
							<div className="z-50 inline-block transform overflow-hidden text-left align-middle shadow-xl transition-all">
								<div className="rounded-2xl border border-transparent p-6 dark:border-lights-300 dark:bg-darks-400 dark:text-white">
									<div className="flex items-start">
										<div className="mt-0 text-left">
											<Dialog.Title as="span" className="w-full text-lg font-bold leading-6">
												{modalTitle}
												<button type="button" className="float-right" onClick={onTitleCloseClick} ref={closeButtonRef}>
													<FontAwesomeIcon icon={faTimes} size="2x" />
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
