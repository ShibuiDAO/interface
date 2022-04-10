import { ABI } from 'constants/abis';
import { SupportedChainId } from 'constants/chains';
import { DEFAULT_CHAIN } from 'constants/misc';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import useProviders from 'hooks/useProviders';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollectionInfo, selectCollectionInfo } from 'state/reducers/collections';

export interface CollectionSpecificsInfoProps {
	address: string;
}

const CollectionSpecificsInfo: React.FC<CollectionSpecificsInfoProps> = ({ address }) => {
	const { chainId, library, account } = useActiveWeb3React();
	const chainIdNormalised: SupportedChainId = chainId || DEFAULT_CHAIN;
	const baseProvider = useProviders()[chainIdNormalised as SupportedChainId];
	const dispatch = useDispatch();

	const info = useSelector(selectCollectionInfo(chainIdNormalised, address));
	if (!info)
		dispatch(
			fetchCollectionInfo({
				address,
				chainId: chainIdNormalised,
				provider: account && library ? library : baseProvider,
				contractABI: ABI.EIP721
			})
		);

	return (
		<>
			<div className="my-4 text-center">
				<h1 className="text-4xl font-bold">{info?.name}</h1>
				{info?.totalSupply && (
					<div className="mt-7">
						<span className="inline-block rounded-lg text-xl font-bold dark:bg-lights-100 dark:text-black">
							<span className="flex gap-12 px-10 pt-3">
								<span>
									<span>{info?.totalSupply ?? 'N/A'}</span>
									<div className="pt-1 pb-4 text-xs dark:text-darks-200">items</div>
								</span>
								<span>
									<span>N/A</span>
									<div className="pt-1 pb-4 text-xs dark:text-darks-200">owners</div>
								</span>
								<span>
									<span>N/A</span>
									<div className="pt-1 pb-4 text-xs dark:text-darks-200">floor price</div>
								</span>
								<span>
									<span>N/A</span>
									<div className="pt-1 pb-4 text-xs dark:text-darks-200">volume</div>
								</span>
							</span>
						</span>
						{/* TODO: Enable this once FE-59 is complete */}
						{/* <div className="m-auto mt-3 w-96 text-left">
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
							<div className="mt-3 flex justify-center">
								<div className="flex gap-4 text-4xl">
									<a href={TWITTER_LINK} target="_blank" rel="noopener noreferrer">
										<FontAwesomeIcon icon={faTwitter} size="xs" />
									</a>
									<a href={GITHUB_LINK} target="_blank" rel="noopener noreferrer">
										<FontAwesomeIcon icon={faGithub} size="xs" />
									</a>
									<a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
										<FontAwesomeIcon icon={faDiscord} size="xs" />
									</a>
									<a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
										<FontAwesomeIcon icon={faTelegram} size="xs" />
									</a>
								</div>
							</div>
						</div> */}
					</div>
				)}
			</div>
		</>
	);
};

export default CollectionSpecificsInfo;
