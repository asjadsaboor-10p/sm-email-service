import * as Boom from 'boom';
import * as Joi from 'joi';
import { sendEmail } from '../../../src/services/email';

describe('Email Service', () => {
  describe('sendEmail method', () => {
    test('should throw joi validation error if to email is not provided', async () => {
      const error = new Error('child "to email" fails because [to email is required]');
      error.name = 'ValidationError';
      return expect(sendEmail({} as any)).rejects.toEqual(error);
    });

    test('should throw joi validation error if to email is not an array', async () => {
      const payload: any = {
        to: 'asjadsaboor@yopmail.com',
      };
      const error = new Error('child "to email" fails because [to email must be an array]');
      error.name = 'ValidationError';
      return expect(sendEmail(payload)).rejects.toEqual(error);
    });

    test('should throw joi validation error if to email is  invalid', async () => {
      const payload: any = {
        to: ['abc123'],
      };
      const error = new Error(
        'child "to email" fails because [to email at position 0 fails because [0 must be a valid email]]',
      );
      error.name = 'ValidationError';
      return expect(sendEmail(payload)).rejects.toEqual(error);
    });

    test('should throw joi validation error if cc email is not an array', async () => {
      const payload: any = {
        to: ['a1@yopmail.com'],
        cc: 'abc@yopmail.com',
      };
      const error = new Error('child "cc email" fails because [cc email must be an array]');
      error.name = 'ValidationError';
      return expect(sendEmail(payload)).rejects.toEqual(error);
    });

    test('should throw joi validation error if cc email is  invalid', async () => {
      const payload: any = {
        to: ['a1@yopmail.com'],
        cc: ['abc'],
      };
      const error = new Error(
        'child "cc email" fails because [cc email at position 0 fails because [0 must be a valid email]]',
      );
      error.name = 'ValidationError';
      return expect(sendEmail(payload)).rejects.toEqual(error);
    });

    test('should throw joi validation error if bcc email is not an array', async () => {
      const payload: any = {
        to: ['a1@yopmail.com'],
        cc: ['a2@yopmail.com'],
        bcc: 'abc@yopmail.com',
      };
      const error = new Error('child "bcc email" fails because [bcc email must be an array]');
      error.name = 'ValidationError';
      return expect(sendEmail(payload)).rejects.toEqual(error);
    });

    test('should throw joi validation error if bcc email is  invalid', async () => {
      const payload: any = {
        to: ['a1@yopmail.com'],
        cc: ['a2@yopmail.com'],
        bcc: ['abc'],
      };
      const error = new Error(
        'child "bcc email" fails because [bcc email at position 0 fails because [0 must be a valid email]]',
      );
      error.name = 'ValidationError';
      return expect(sendEmail(payload)).rejects.toEqual(error);
    });

    test('should throw joi validation error if subject is not provided', async () => {
      const payload: any = {
        to: ['a1@yopmail.com'],
        cc: ['a2@yopmail.com'],
        bcc: ['a3@yopmail.com'],
      };
      const error = new Error('child "subject" fails because [subject is required]');
      error.name = 'ValidationError';
      return expect(sendEmail(payload)).rejects.toEqual(error);
    });

    test('should throw joi validation error if body is not provided', async () => {
      const payload: any = {
        to: ['a1@yopmail.com'],
        cc: ['a2@yopmail.com'],
        bcc: ['a3@yopmail.com'],
        subject: 'test subject',
      };
      const error = new Error('child "body" fails because [body is required]');
      error.name = 'ValidationError';
      return expect(sendEmail(payload)).rejects.toEqual(error);
    });
  });
});
