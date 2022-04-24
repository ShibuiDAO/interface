import { Provider } from '@ethersproject/providers';
import { SupportedChainId } from 'constants/chains';
import { ZERO_ADDRESS } from 'constants/misc';
import * as Yup from 'yup';
import { l2NFTBridgeContract } from './contracts';

export const SellFormSchema = Yup.object().shape({
	price: Yup.string().required(),
	expiration: Yup.string()
		.test('string-valid-number', '', function testExpirationStringAsValidNumber(value) {
			return value !== undefined && !isNaN(parseInt(value, 10)) && Number(value) > 0;
		})
		.required()
});

export const MetadataTestingParametersFormSchema = Yup.object().shape({
	contract: Yup.string().required(),
	asset: Yup.string().required()
});

export const BridgeFormSchema = (chainId: SupportedChainId, provider: Provider) =>
	Yup.object().shape({
		l2Contract: Yup.string()
			.required('The L2 NFT Contract address is required')
			.matches(/^0x[a-fA-F0-9]{40}$/, 'This is not a valid address')
			.length(42, 'This is not a valid address')
			.test('validPair', "This contract isn't registered with the bridge", async (address) => {
				if (address && address.length === 42) {
					const bridge = l2NFTBridgeContract(chainId, provider);
					try {
						const pairInfo = await bridge.pairNFTInfo(address);
						if (pairInfo.every((f) => f === ZERO_ADDRESS || f === 0)) return false;
					} catch {
						return false;
					}
				}

				return true;
			}),
		tokenId: Yup.string().required('The token ID of the asset being bridged is required'),
		l1Receiver: Yup.string()
			.optional()
			.matches(/^0x[a-fA-F0-9]{40}$/, 'This is not a valid address')
			.length(42, 'This is not a valid address')
	});
