export interface BaseMetadata {
	name: string;
	description?: string;

	collection?: string;
	contract?: string;
	identifier?: BigInt;

	image?: string;
	image_url?: string; // ETH-ZUNK
	image_data?: string; // TuringMonsters

	image_final: string;
}
