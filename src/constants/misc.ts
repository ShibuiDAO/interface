import { SupportedChainId } from './chains';

export const IS_IN_IFRAME = typeof window !== 'undefined' && window !== undefined && window.parent !== window;
export const DEFAULT_CHAIN = (process.env.NEXT_PUBLIC_DEFAULT_CHAIN ?? SupportedChainId.BOBA) as SupportedChainId;
export const COLLECTION_REFRESH_INTERVAL =
	(process.env.NEXT_PUBLIC_COLLECTION_REFRESH_INTERVAL ? Number(process.env.NEXT_PUBLIC_COLLECTION_REFRESH_INTERVAL) : undefined) ?? 3000;

export const TORUS_USER_CLOSED_PROMPT_MESSAGE = 'User cancelled login';

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const MULTI_SOURCE_CONTENT_DISPLAY_URI_FALLBACK = 'http://t.t';
export const MULTI_SOURCE_CONTENT_DISPLAY_IMG_FALLBACK = 'https://i.ibb.co/q7DP0Dz/no-image.png';
