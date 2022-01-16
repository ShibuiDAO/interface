import { ethers } from 'ethers';
import { FieldInputProps, useField, useFormikContext } from 'formik';
import React from 'react';

export interface EthInputFormikProps extends Pick<FieldInputProps<any>, 'value' | 'onChange'> {
	name: string;
	className?: string;
}

const EthInputFormik: React.FC<EthInputFormikProps> = ({ ...props }) => {
	const { setFieldValue } = useFormikContext();
	const [field] = useField(props);

	return (
		<input
			{...props}
			{...field}
			onChange={(val) => {
				setFieldValue(field.name, ethers.utils.parseEther(val.target.value).toString());
			}}
		/>
	);
};

export default EthInputFormik;
