import { faDiscord, faGithub, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DISCORD_LINK, GITHUB_LINK, TELEGRAM_LINK, TWITTER_LINK } from 'constants/links';
import { generateSitemap } from 'core/sitemap';
import { GetStaticProps, NextPage } from 'next';
import path from 'path';
import React from 'react';

const IndexPage: NextPage = () => {
	return (
		<>
			<div
				style={{
					backgroundImage: 'url(/assets/misc/background.svg)',
					backgroundSize: 'cover'
				}}
			>
				<div className="container">
					<div className="hero min-h-screen">
						<div className="hero-content flex-col lg:flex-col-reverse">
							<div className="text-left">
								<h1 className="mb-5 text-5xl font-bold capitalize">View, buy & sell BOBA NFTs</h1>
								<p className="mb-5">
									Shibui marketplace is a BOBA-only NFT marketplace with super low fees and governed by the community.
								</p>
								<div className="mb-5 flex gap-4">
									<a href={TWITTER_LINK} target="_blank" rel="noopener noreferrer">
										<FontAwesomeIcon icon={faTwitter} />
									</a>
									<a href={GITHUB_LINK} target="_blank" rel="noopener noreferrer">
										<FontAwesomeIcon icon={faGithub} />
									</a>
									<a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
										<FontAwesomeIcon icon={faDiscord} />
									</a>
									<a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
										<FontAwesomeIcon icon={faTelegram} />
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const directory = path.join(process.cwd(), 'src');

	await generateSitemap(directory);

	return { props: {} };
};

export default IndexPage;
