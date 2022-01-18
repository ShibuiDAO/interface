import { faDiscord, faGithub, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GITHUB_LINK, TWITTER_LINK } from 'constants/linkts';
import React from 'react';

const Footer: React.FC = () => {
	return (
		<>
			<div className="border-t-2 dark:border-darks-200 dark:bg-darks-400 dark:text-white">
				<div className="container">
					<div className="p-10 footer">
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
								<a href="" target="_blank" rel="noopener noreferrer">
									<FontAwesomeIcon icon={faDiscord} />
								</a>
								<a href="" target="_blank" rel="noopener noreferrer">
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
