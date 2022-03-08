import { MULTI_SOURCE_CONTENT_DISPLAY_IMG_FALLBACK, MULTI_SOURCE_CONTENT_DISPLAY_URI_FALLBACK } from 'constants/misc';
import React from 'react';
import { resolveIPFS } from 'utils/ipfs';
import { quirkIPFSGateway, quirkIPFSHash } from 'utils/quirks/ipfs';
import { quirkSVGImage } from 'utils/quirks/shared';

export interface MultiSourceContentDisplayProps {
	src: string;
	className?: string;
	alt?: string;
	fallback?: string;
}

const MultiSourceContentDisplay: React.FC<MultiSourceContentDisplayProps> = ({ src: uri, className, alt, fallback }) => {
	fallback ??= MULTI_SOURCE_CONTENT_DISPLAY_IMG_FALLBACK;
	uri = uri === '' ? MULTI_SOURCE_CONTENT_DISPLAY_URI_FALLBACK : uri;
	[uri] = quirkIPFSHash(uri, false);
	const uriStructure = new URL(uri);

	if (uriStructure.protocol === 'ipfs:') uri = resolveIPFS(uri);
	[uri] = quirkIPFSGateway(uri, false);
	[uri] = quirkSVGImage(uri, uriStructure);

	return <img src={uri} className={className} alt={alt} loading="lazy" onError={(ev: any) => (ev.target.src = fallback)} />;
};

export default MultiSourceContentDisplay;
