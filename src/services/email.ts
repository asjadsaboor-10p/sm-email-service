import * as joiSchema from '../validations/schemas/index';
import { validate } from '../validations/index';

export const sendEmail = async (payload: any): Promise<void> => {
  validate(payload, joiSchema.sendEmail);
};
