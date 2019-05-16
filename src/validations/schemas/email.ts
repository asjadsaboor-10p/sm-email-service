import * as Joi from 'joi';

export const sendEmail: Joi.SchemaMap = {
  to: Joi.array()
    .required()
    .items(
      Joi.string()
        .required()
        .email(),
    )
    .min(1)
    .max(10)
    .label('to email'),
  cc: Joi.array()
    .items(
      Joi.string()
        .required()
        .email(),
    )
    .min(0)
    .max(10)
    .label('cc email'),
  bcc: Joi.array()
    .items(
      Joi.string()
        .required()
        .email(),
    )
    .min(0)
    .max(10)
    .label('bcc email'),
  subject: Joi.string()
    .required()
    .max(255),
  body: Joi.string()
    .required()
    .max(5000),
};
