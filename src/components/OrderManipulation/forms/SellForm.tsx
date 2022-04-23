import EthInputFormik from 'components/forms/EthInputFormik';
import FormFieldError from 'components/forms/FormFieldError';
import SimpleDaysInputFormik from 'components/forms/SimpleDaysInputFormik';
import { BigNumber, BigNumberish, ethers } from 'ethers';
import { Form, Formik } from 'formik';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import React from 'react';
import { useDispatch } from 'react-redux';
import { clearOrder, createSellOrder } from 'state/reducers/orders';
import { SellFormSchema } from 'utils/schemas';

export interface SellFormFields {
	price: string;
	expiration: string;
}

export interface SellFormProps {
	contract: string;
	identifier: BigNumberish;
}

const SellForm: React.FC<SellFormProps> = ({ contract, identifier }) => {
	const { chainId, library } = useActiveWeb3React();
	const dispatch = useDispatch();

	if (!chainId || !library) return null;

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
							chainId,
							library,
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
