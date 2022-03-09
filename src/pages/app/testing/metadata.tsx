import { Erc721Token } from '@subgraphs/eip721-matic';
import ERC721Asset from 'components/Assets/ERC721Asset';
import Offset from 'components/Navbar/Offset';
import { SupportedChainId } from 'constants/chains';
import { DEFAULT_CHAIN } from 'constants/misc';
import { Form, Formik } from 'formik';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import { NextPage } from 'next';
import React, { useState } from 'react';
import { MetadataTestingParametersFormSchema } from 'utils/schemas';

const TestingMetadataPage: NextPage = () => {
	const { chainId } = useActiveWeb3React();
	const chainIdNormalised: SupportedChainId = chainId || DEFAULT_CHAIN;

	const [token, setToken] = useState<{ contract: string; asset: string } | null>(null);

	return (
		<>
			<Offset />
			<div>
				<div>
					<Formik
						initialValues={{
							contract: '',
							asset: ''
						}}
						validationSchema={MetadataTestingParametersFormSchema}
						onSubmit={(data: { contract: string; asset: string }) => {
							setToken(data);
						}}
					>
						{(props) => (
							<Form>
								<>
									<div>
										<input
											type="text"
											name="contract"
											value={props.values.contract}
											placeholder="Contract"
											onChange={props.handleChange}
											className="dark:bg-darks-100 dark:text-black"
										/>
										<input
											type="text"
											name="asset"
											value={props.values.asset}
											placeholder="Asset"
											onChange={props.handleChange}
											className="dark:bg-darks-100 dark:text-black"
										/>
									</div>
									<div className="pt-4">
										<button type="submit" className="btn bg-gray-200 text-black hover:bg-gray-400">
											Fetch
										</button>
									</div>
								</>
							</Form>
						)}
					</Formik>
				</div>
				<div>
					{token && (
						<ERC721Asset
							token={
								{
									contract: { id: token.contract },
									owner: { id: '' },
									identifier: token.asset as unknown as BigInt
								} as unknown as Erc721Token
							}
							chainId={chainIdNormalised}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default TestingMetadataPage;
