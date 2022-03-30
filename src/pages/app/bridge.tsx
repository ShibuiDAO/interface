/* eslint-disable no-alert */
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormFieldError from 'components/forms/FormFieldError';
import FormFieldInfo from 'components/forms/FormFieldInfo';
import { SupportedChainId } from 'constants/chains';
import { DEFAULT_CHAIN } from 'constants/misc';
import { Form, Formik } from 'formik';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useForceConnectMenu from 'hooks/useForceConnectMenu';
import useProviders from 'hooks/useProviders';
import { NextPage } from 'next';
import React from 'react';
import { When } from 'react-if';
import { BridgeFormSchema } from 'utils/schemas';

const TestingMetadataPage: NextPage = () => {
	useForceConnectMenu();
	const { account, chainId, library } = useActiveWeb3React();

	const chainIdNormalised: SupportedChainId = chainId || DEFAULT_CHAIN;
	const fallbackProvider = useProviders()[chainIdNormalised];
	const readonlyProvider = library || fallbackProvider;

	return (
		<>
			<div
				style={{
					backgroundImage: 'url(/assets/misc/background.svg)',
					backgroundSize: 'cover'
				}}
			>
				<div className="container">
					<div className="flex min-h-[100vh] w-full flex-row items-center justify-center">
						<div className="rounded-2xl border p-4 dark:border-lights-100 dark:bg-darks-400 dark:text-white">
							<div className="p-4">
								<div className="rounded-xl border p-4 font-bold dark:border-lights-300 dark:bg-lights-200 dark:text-black">
									<div className="">
										<div className="grid grid-cols-3 gap-8 text-center">
											<div className="flex flex-row items-center justify-center">
												<img className="inline h-10 object-contain" src="/assets/chains/boba.svg" />
												<span className="pl-2">Boba</span>
											</div>
											<div className="flex flex-row items-center justify-center">
												<FontAwesomeIcon icon={faArrowRightLong} />
											</div>
											<div className="flex flex-row items-center justify-center">
												<img className="inline h-10 object-contain" src="/assets/chains/mainnet.svg" />
												<span className="pl-2">Ethereum</span>
											</div>
										</div>
									</div>
								</div>
								<div className="pt-4">
									<>
										<Formik
											initialValues={{
												l2Contract: '',
												tokenId: '',
												l1Receiver: ''
											}}
											validationSchema={BridgeFormSchema(chainIdNormalised, readonlyProvider)}
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
																	className="border-element-secondary outline-none block w-full rounded-lg border-b border-dotted bg-darks-200 px-2 py-1 text-white"
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
																	className="border-element-secondary outline-none block w-full rounded-lg border-b border-dotted bg-darks-200 px-2 py-1 text-white"
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
																	className="border-element-secondary outline-none block w-full rounded-lg border-b border-dotted bg-darks-200 px-2 py-1 text-white"
																/>
																<FormFieldError message={props.errors.l1Receiver} />
															</div>
														</div>
														<div className="mt-4">
															<When condition={Boolean(account)}>
																<button
																	type="submit"
																	className="btn w-full bg-lights-300 text-black hover:bg-lights-400 hover:text-white"
																>
																	Bridge
																</button>
															</When>
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
			</div>
		</>
	);
};

export default TestingMetadataPage;
