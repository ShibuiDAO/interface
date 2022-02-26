import React from 'react';
import MultiSourceContentDisplay, { MultiSourceContentDisplayProps } from './MultiSourceContentDisplay';

const ProtectedMultiSourceContentDisplay: React.FC<MultiSourceContentDisplayProps> = (props) => {
	return (
		<span onContextMenu={(e) => e.preventDefault()}>
			<MultiSourceContentDisplay {...props} />
		</span>
	);
};

export default ProtectedMultiSourceContentDisplay;
