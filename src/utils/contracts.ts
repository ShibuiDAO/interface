import { JsonRpcSigner } from '@ethersproject/providers';
import type { ERC721ExchangeUpgradeable } from '@shibuidao/exchange';
import { ABI, ABIs } from 'constants/abis';
import { SupportedChainId } from 'constants/chains';
import { Contract } from 'ethers';
import type { L2NFTBridge } from '@shibuidao/boba-nft-bridge';
import { L2_NFT_BRIDGE } from 'constants/contracts';

export function exchangeContract(address: string, signer: JsonRpcSigner): ERC721ExchangeUpgradeable {
	return new Contract(address, ABIs[ABI.ERC721_EXCHANGE], signer) as ERC721ExchangeUpgradeable;
}

export function l2NFTBridgeContract(chainId: SupportedChainId, signer: JsonRpcSigner): L2NFTBridge {
	return new Contract(L2_NFT_BRIDGE[chainId], ABIs[ABI.L2_NFT_BRIDGE], signer) as unknown as L2NFTBridge;
}
