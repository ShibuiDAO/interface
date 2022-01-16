import { useField, useFormikContext } from 'formik';
import React from 'react';
import DatePicker from 'react-datepicker';

export interface DatePickerFormikProps {
	name: string;
	className?: string;
}

const DatePickerFormik: React.FC<DatePickerFormikProps> = ({ ...props }) => {
	const { setFieldValue } = useFormikContext();
	const [field] = useField(props);

	return (
		<DatePicker
			{...props}
			{...field}
			selected={(field.value && new Date(field.value)) || null}
			onChange={(val) => {
				setFieldValue(field.name, val);
			}}
		/>
	);
};

export default DatePickerFormik;
