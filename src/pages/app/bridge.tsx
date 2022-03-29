/* eslint-disable no-alert */
import FormFieldError from 'components/forms/FormFieldError';
import FormFieldInfo from 'components/forms/FormFieldInfo';
import { Form, Formik } from 'formik';
import useForceConnectMenu from 'hooks/useForceConnectMenu';
import { NextPage } from 'next';
import React from 'react';
import { BridgeFormSchema } from 'utils/schemas';

const TestingMetadataPage: NextPage = () => {
	useForceConnectMenu();

	return (
		<>
			<div
				style={{
					backgroundImage: 'url(/assets/misc/background.svg)',
					backgroundSize: 'cover'
				}}
			>
				<div className="container">
					<div className="flex min-h-screen w-full flex-row items-center justify-center">
						<div className="rounded-2xl border p-4 dark:border-lights-100 dark:bg-darks-400 dark:text-white">
							<div className="p-4">
								<>
									<Formik
										initialValues={{
											l2Contract: '',
											tokenId: '',
											l1Receiver: ''
										}}
										validationSchema={BridgeFormSchema}
										onSubmit={(data) => alert(data)}
									>
										{(props) => (
											<Form>
												<>
													<div>
														<div className="py-2">
															<label htmlFor="l2Contract" className="mb-2 text-lg font-bold text-white">
																L2 NFT Contract Address
															</label>
															<FormFieldInfo message="Address of the collection on the Boba L2 network" />
															<input
																name="l2Contract"
																type="text"
																onChange={props.handleChange}
																value={props.values.l2Contract}
																className="border-element-secondary outline-none block w-full rounded-lg border-b border-dotted bg-darks-200 pl-1 text-white"
															/>
															<FormFieldError message={props.errors.l2Contract} />
														</div>
														<div className="py-2">
															<label htmlFor="tokenId" className="mb-2 text-lg font-bold text-white">
																Token ID
															</label>
															<FormFieldInfo message="ID of the asset to bridge" />
															<input
																name="tokenId"
																type="text"
																onChange={props.handleChange}
																value={props.values.tokenId}
																className="border-element-secondary outline-none block w-full rounded-lg border-b border-dotted bg-darks-200 pl-1 text-white"
															/>
															<FormFieldError message={props.errors.tokenId} />
														</div>
														<div className="py-2">
															<label htmlFor="l1Receiver" className="mb-2 text-lg font-bold text-white">
																L1 Receiver
															</label>
															<FormFieldInfo message="The address to which to bridge on L1" />
															<input
																name="l1Receiver"
																type="text"
																onChange={props.handleChange}
																value={props.values.l1Receiver}
																className="border-element-secondary outline-none block w-full rounded-lg border-b border-dotted bg-darks-200 pl-1 text-white"
															/>
															<FormFieldError message={props.errors.l1Receiver} />
														</div>
													</div>
													<div>
														<button type="submit" className="btn bg-gray-200 text-black hover:bg-gray-400">
															Bridge
														</button>
													</div>
												</>
											</Form>
										)}
									</Formik>
								</>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default TestingMetadataPage;
