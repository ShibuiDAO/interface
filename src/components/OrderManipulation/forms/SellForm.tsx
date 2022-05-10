import EthInputFormik from 'components/forms/EthInputFormik';
import FormFieldError from 'components/forms/FormFieldError';
import SimpleDaysInputFormik from 'components/forms/SimpleDaysInputFormik';
import { SupportedChainId } from 'constants/chains';
import { DEFAULT_CHAIN } from 'constants/misc';
import { BigNumber, BigNumberish, ethers } from 'ethers';
import { Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { clearOrder, createSellOrder } from 'state/reducers/orders';
import { SellFormSchema } from 'utils/schemas';
import { useSigner } from 'wagmi';

export interface SellFormFields {
	price: string;
	expiration: string;
}

export interface SellFormProps {
	contract: string;
	identifier: BigNumberish;
}

const SellForm: React.FC<SellFormProps> = ({ contract, identifier }) => {
	const { data: signer } = useSigner();

	const chainIdNormalised: SupportedChainId = DEFAULT_CHAIN;

	const dispatch = useDispatch();

	if (!signer) return null;

	return (
		<>
			<Formik
				initialValues={{
					price: '1',
					expiration: '1'
				}}
				validationSchema={SellFormSchema}
				onSubmit={(values: SellFormFields) => {
					dispatch(
						createSellOrder({
							chainId: chainIdNormalised,
							signer,
							data: {
								tokenContractAddress: contract,
								tokenId: identifier,
								expiration: BigNumber.from(Math.floor(new Date().getTime() / 1000) + Number(values.expiration) * 86400),
								price: ethers.utils.parseEther(values.price)
							}
						})
					);
					dispatch(clearOrder());
				}}
			>
				{(props) => (
					<Form>
						<>
							<div>
								<div className="pt-4">
									<label htmlFor="expiration" className="text-white">
										Sale ends in
									</label>
									<SimpleDaysInputFormik
										name="expiration"
										onChange={props.handleChange}
										value={props.values.expiration}
										className="border-element-secondary outline-none bg-darks-400 text-white"
										classNameField="border-element-secondary outline-none border-b border-dotted bg-darks-400 text-white"
									/>
								</div>
								<div className="pt-4">
									<label htmlFor="price" className="mb-2 text-lg font-bold text-white">
										Price
									</label>
									<EthInputFormik
										name="price"
										onChange={props.handleChange}
										value={props.values.price}
										className="border-element-secondary outline-none w-24 border-b border-dotted bg-darks-400 text-white"
									/>
									<FormFieldError message={props.errors.price} />
								</div>
								<div>
									<div className="pt-4">
										<button type="submit" className="btn border border-white bg-lights-300 text-white hover:bg-lights-400">
											Confirm
										</button>
									</div>
								</div>
							</div>
						</>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default SellForm;
