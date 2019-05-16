import {
  SchemaLike,
  validate as joiValidate,
  LanguageRootOptions,
  ValidationOptions,
  ValidationError,
} from 'joi';

const language: LanguageRootOptions = {
  key: '{{label}} ',
};
const defaultOptions: ValidationOptions = {
  language,
  allowUnknown: false,
};

export const validate = <T>(
  payload: T,
  schema: SchemaLike,
  options?: ValidationOptions,
): ValidationError => {
  const joiValidationOptions = options
    ? Object.assign({}, defaultOptions, options)
    : defaultOptions;
  const { error } = joiValidate(payload, schema, joiValidationOptions);
  console.log('error', error);
  if (error) {
    throw error;
  }
  return error;
};
