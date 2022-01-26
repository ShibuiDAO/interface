import DatePickerFormik from 'components/forms/DatePickerFormik';
import EthInputFormik from 'components/forms/EthInputFormik';
import FormFieldError from 'components/forms/FormFieldError';
import FormFieldInfo from 'components/forms/FormFieldInfo';
import { BigNumber, BigNumberish, ethers } from 'ethers';
import { Form, Formik } from 'formik';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import React from 'react';
import { useDispatch } from 'react-redux';
import { clearOrder, createSellOrder } from 'state/reducers/orders';
import * as Yup from 'yup';

export interface SellFormFields {
	price: string;
	expiration: Date;
}

const SellFormSchema = Yup.object().shape({
	price: Yup.string().required(),
	expiration: Yup.date()
		.test('date-more-than-now', '', function testDateValidity(value) {
			return value !== undefined && value.getTime() > new Date().getTime();
		})
		.required()
});

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
					expiration: new Date()
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
								expiration: BigNumber.from(values.expiration.getTime() / 1000),
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
							<div className="pt-4">
								<label htmlFor="price" className="mb-2 text-lg font-bold text-white">
									Price
								</label>
								<FormFieldInfo message="The price in ETH" />
								<EthInputFormik
									name="price"
									onChange={props.handleChange}
									value={props.values.price}
									className="border-element-secondary outline-none block w-full border-b border-dotted bg-black text-white"
								/>
								<FormFieldError message={props.errors.price} />
							</div>
							<div className="pt-4">
								<label htmlFor="expiration" className="text-lg font-bold text-white">
									Expiration
								</label>
								<FormFieldInfo message="The date when the SellOrder expires" />
								<DatePickerFormik
									name="expiration"
									className="pt-4"
									onChange={props.handleChange}
									value={props.values.expiration}
									minDate={props.initialValues.expiration}
									showTimeSelect={false}
									inline={true}
								/>
							</div>
							<div className="pt-4">
								<button type="submit" className="btn bg-gray-200 text-black hover:bg-gray-400">
									List
								</button>
							</div>
						</>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default SellForm;
