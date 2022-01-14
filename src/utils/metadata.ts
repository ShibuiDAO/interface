import type { BaseMetadata } from 'types/metadata';

export type MetadataParsingData<T = BaseMetadata | undefined> = [metadata: T, valid: boolean];
export type MetadataParsingReturn<T = BaseMetadata | undefined> = MetadataParsingData<T> | Promise<MetadataParsingData<T>>;

export function metadataBase64(uri: string): MetadataParsingReturn {
	if (!uri) return [undefined, false];
	const uriBlobParts = uri.split(',');
	const blob = uriBlobParts[uriBlobParts.length - 1];

	try {
		atob(blob);
	} catch {
		return [undefined, false];
	}

	return [JSON.parse(atob(blob)), true];
}

export function metadataAPI(uri: string, shouldProxy: boolean): MetadataParsingReturn {
	if (!uri) return [undefined, false];

	return fetch(`${shouldProxy ? process.env.NEXT_PUBLIC_CORS_PROXY : ''}${uri.trim()}`)
		.then((res) => res.json())
		.then((metadata_) => [metadata_, true] as MetadataParsingData)
		.catch(() => [undefined, false] as MetadataParsingData);
}
