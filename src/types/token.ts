export interface TokenContract {
	name?: string;
	id: string;
}

export interface Token {
	owner: string;
	identifier: BigInt;
	contract: TokenContract;
}
