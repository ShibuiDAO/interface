import { FieldInputProps, useField } from 'formik';
import React from 'react';

export interface EthInputFormikProps extends Pick<FieldInputProps<any>, 'value' | 'onChange'> {
	name: string;
	className?: string;
}

const EthInputFormik: React.FC<EthInputFormikProps> = ({ ...props }) => {
	const [field] = useField(props);

	return <input type="text" {...props} {...field} />;
};

export default EthInputFormik;
