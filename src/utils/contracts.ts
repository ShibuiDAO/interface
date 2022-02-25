import { JsonRpcSigner } from '@ethersproject/providers';
import type { ERC721ExchangeUpgradeable } from '@shibuidao/exchange';
import { ABI, ABIs } from 'constants/abis';
import { Contract } from 'ethers';

export function exchangeContract(address: string, signer: JsonRpcSigner): ERC721ExchangeUpgradeable {
	return new Contract(address, ABIs[ABI.ERC721_EXCHANGE], signer) as ERC721ExchangeUpgradeable;
}
