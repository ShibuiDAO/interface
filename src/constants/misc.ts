import { SupportedChainId } from './chains';

export const IS_IN_IFRAME = typeof window !== 'undefined' && window !== undefined && window.parent !== window;

export const DEFAULT_CHAIN = (process.env.NEXT_PUBLIC_DEFAULT_CHAIN ?? SupportedChainId.BOBA) as SupportedChainId;
