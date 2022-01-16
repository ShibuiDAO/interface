import DatePickerFormik from 'components/forms/DatePickerFormik';
import EthInputFormik from 'components/forms/EthInputFormik';
import FormFieldInfo from 'components/forms/FormFieldInfo';
import { BigNumber, BigNumberish } from 'ethers';
import { Form, Formik } from 'formik';
import { useActiveWeb3React } from 'hooks/useActiveWeb3React';
import React from 'react';
import { useDispatch } from 'react-redux';
import { createSellOrder } from 'state/reducers/orders';
import * as Yup from 'yup';

export interface SellFormFields {
	price: string;
	expiration: Date;
}

const SellFormSchema = Yup.object().shape({
	price: Yup.string().required(),
	expiration: Yup.date().required()
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
					price: '0',
					expiration: new Date()
				}}
				validationSchema={SellFormSchema}
				onSubmit={(values: SellFormFields) =>
					void dispatch(
						createSellOrder({
							chainId,
							library,
							data: {
								tokenContractAddress: contract,
								tokenId: identifier,
								expiration: BigNumber.from(values.expiration.getTime()),
								price: BigNumber.from(values.price)
							}
						})
					)
				}
			>
				{(props) => (
					<Form>
						<>
							<div className="pt-4">
								<label htmlFor="price">Price</label>
								<FormFieldInfo message="The price" />
								<EthInputFormik name="price" onChange={props.handleChange} value={props.values.price} />
							</div>
							<div className="pt-4">
								<label htmlFor="expiration">Expiration</label>
								<FormFieldInfo message="The date when the SellOrder expires" />
								<DatePickerFormik name="expiration" className="z-50" onChange={props.handleChange} value={props.values.expiration} />
							</div>
							<div className="pt-4">
								<button type="submit" className="text-white">
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
