import { faDiscord, faGithub, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DISCORD_LINK, GITHUB_LINK, TELEGRAM_LINK, TWITTER_LINK } from 'constants/links';
import React from 'react';

const Footer: React.FC = () => {
	return (
		<>
			<div className="border-t-2 dark:border-darks-200 dark:bg-darks-400 dark:text-white">
				<div className="container">
					<div className="footer p-10">
						<div>
							<img src="/wide.svg" alt="ShibuiDAO header wide logo." />
						</div>
						<div className="md:place-self-center md:justify-self-end">
							<div className="flex gap-4">
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
		</>
	);
};

export default Footer;
