import { SchemaLike, validate as joiValidate, LanguageRootOptions, ValidationOptions } from 'joi';
import { badRequest } from 'boom';

const language: LanguageRootOptions = {
  key: '{{label}} ',
};
const defaultOptions: ValidationOptions = {
  language,
  allowUnknown: false,
  // convert: false,
};

export const validate = <T>(payload: T, schema: SchemaLike, options?: ValidationOptions): any => {
  const joiValidationOptions = options
    ? Object.assign({}, defaultOptions, options)
    : defaultOptions;
  const { error, value } = joiValidate(payload, schema, joiValidationOptions);
  if (error) {
    throw error;
  }
  return value;
};

export const validateEmailShouldBeUnique = (
  to: string[],
  cc: string[] = [],
  bcc: string[] = [],
) => {
  const combined = to.concat(cc).concat(bcc);
  const hasDuplicates = new Set(combined).size !== combined.length;
  if (hasDuplicates) {
    throw badRequest('Emails should be unique between to,cc and bcc');
  }
};
