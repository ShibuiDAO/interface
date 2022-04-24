import { Erc721Token } from '@subgraphs/eip721-matic';
import ERC721Asset from 'components/Assets/ERC721Asset';
import Offset from 'components/Navbar/Offset';
import { SupportedChainId } from 'constants/chains';
import { DEFAULT_CHAIN } from 'constants/misc';
import { Form, Formik } from 'formik';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Highlight, { defaultProps } from 'prism-react-renderer';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAssetMetadata } from 'state/reducers/assets';
import { MetadataTestingParametersFormSchema } from 'utils/schemas';

const TestingMetadataPage: NextPage = () => {
	const { chainId } = useActiveWeb3React();
	const chainIdNormalised: SupportedChainId = chainId || DEFAULT_CHAIN;

	const [token, setToken] = useState<{ contract: string; asset: string } | null>(null);
	const metadata = useSelector(selectAssetMetadata(chainIdNormalised, token?.contract || '', (token?.asset || '') as unknown as BigInt));

	return (
		<>
			<NextSeo title="Metadata Preview" openGraph={{ title: 'ShibuiNFT Metadata Preview' }} />
			<Offset />
			<div className="py-4">
				<div className="flex w-full min-w-full justify-center">
					<div className="mx-auto">
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
												className="mx-2 rounded-xl p-2 py-3 dark:bg-darks-100 dark:text-black"
											/>
											<input
												type="text"
												name="asset"
												value={props.values.asset}
												placeholder="Asset"
												onChange={props.handleChange}
												className="mx-2 rounded-xl p-2 py-3 dark:bg-darks-100 dark:text-black"
											/>
										</div>
										<div className="flex w-full min-w-full justify-center pt-4">
											<button type="submit" className="btn bg-gray-200 text-black hover:bg-gray-400">
												Fetch
											</button>
										</div>
									</>
								</Form>
							)}
						</Formik>
					</div>
				</div>
				<div className="flex w-full min-w-full justify-center py-4">
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
				<div className="w-full min-w-full justify-center py-4">
					{token && metadata && (
						<Highlight {...defaultProps} code={JSON.stringify(metadata, null, 2)} language="json">
							{({ className, style, tokens, getLineProps, getTokenProps }) => (
								<pre className={`${className} m-4 overflow-scroll rounded-xl p-4`} style={style}>
									{tokens.map((line, i) => (
										<div {...getLineProps({ line, key: i })}>
											{line.map((token, key) => (
												<span {...getTokenProps({ token, key })} />
											))}
										</div>
									))}
								</pre>
							)}
						</Highlight>
					)}
				</div>
			</div>
		</>
	);
};

export default TestingMetadataPage;
