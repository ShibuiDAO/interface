import React from 'react';

export interface FormFieldErrorProps {
	message?: string;
}

const FormFieldError: React.FC<FormFieldErrorProps> = ({ message }) => {
	return <>{message ? <div className="text-red-600 italic pt-1 pb-2 text-sm">{message}</div> : null}</>;
};

export default FormFieldError;
