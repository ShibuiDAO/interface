import * as Yup from 'yup';

export const SellFormSchema = Yup.object().shape({
	price: Yup.string().required(),
	expiration: Yup.string()
		.test('string-valid-number', '', function testExpirationStringAsValidNumber(value) {
			return value !== undefined && !isNaN(parseInt(value, 10)) && Number(value) > 0;
		})
		.required()
});

export const MetadataTestingParametersFormSchema = Yup.object().shape({
	contract: Yup.string().required(),
	asset: Yup.string().required()
});
