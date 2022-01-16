import { FieldInputProps, useField, useFormikContext } from 'formik';
import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { createPortal } from 'react-dom';

export interface DatePickerFormikProps extends Pick<FieldInputProps<any>, 'value' | 'onChange'> {
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
			className={`unreset ${props.className || ''}`}
			selected={(field.value && new Date(field.value)) || null}
			onChange={(val) => {
				setFieldValue(field.name, val);
			}}
			popperContainer={({ children }) => createPortal(children, document.body)}
		/>
	);
};

export default DatePickerFormik;
