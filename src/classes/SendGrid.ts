import { IEmailTransportRequest, IEmailTransportResponse } from '../interfaces/index';
import { EmailTransport } from './EmailTransport';
import * as rp from 'request-promise-native';
import * as Boom from 'boom';

export class SendGrid extends EmailTransport {
  constructor(apiKey: string) {
    super(apiKey);
    this.defaultHeaders = {
      Accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    };
    this.baseUrl = 'https://api.sendgrid.com';
  }

  public async sendEmail(payload: IEmailTransportRequest): Promise<IEmailTransportResponse> {
    const options = {
      method: 'POST',
      uri: `${this.baseUrl}/v3/mail/send`,
      json: true,
      headers: this.defaultHeaders,
      body: this.createRequestBody(payload),
    };
    await rp.post(options).catch(this.boomifyError);
    return { success: true };
  }

  public createRequestBody(payload: IEmailTransportRequest): Object {
    return {
      personalizations: [
        {
          to: payload.to.map(email => {
            return { email };
          }),
          cc:
            payload.cc &&
            payload.cc.map(email => {
              return { email };
            }),
          bcc:
            payload.bcc &&
            payload.bcc.map(email => {
              return { email };
            }),
          subject: payload.subject,
        },
      ],
      from: {
        email: payload.from,
      },
      content: [
        {
          type: 'text/plain',
          value: payload.body,
        },
      ],
    };
  }
}
