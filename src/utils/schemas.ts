import * as Yup from 'yup';

export const SellFormSchema = Yup.object().shape({
	price: Yup.string().required(),
	expiration: Yup.date()
		.test('date-more-than-now', '', function testDateValidity(value) {
			return value !== undefined && value.getTime() > new Date().getTime();
		})
		.required()
});

export const MetadataTestingParametersFormSchema = Yup.object().shape({
	contract: Yup.string().required(),
	asset: Yup.string().required()
});
