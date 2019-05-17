import * as Boom from 'boom';
import { sendEmail } from '../../../src/services/email';

describe('Email Service', () => {
  describe('sendEmail method', () => {
    test('should throw joi validation error if to email is not provided', async () => {
      const error = new Error('child "to email" fails because [to email is required]');
      error.name = 'ValidationError';
      return expect(sendEmail({} as any)).rejects.toEqual(error);
    });
  });
});
