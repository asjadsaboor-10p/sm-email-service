import { IEmailTransportRequest, IEmailTransportResponse } from '../interfaces/index';
import { EmailTransport } from './EmailTransport';
import * as rp from 'request-promise-native';
import * as Boom from 'boom';

export class MailGun extends EmailTransport {
  constructor(apiKey: string, domain?: string) {
    super(apiKey, domain);
    this.defaultHeaders = {
      Accept: 'application/x-www-form-urlencoded',
    };
    this.baseUrl = `https://api:${this.apiKey}@api.mailgun.net/v3`;
  }

  public async sendEmail(payload: IEmailTransportRequest): Promise<IEmailTransportResponse> {
    const options = {
      method: 'POST',
      uri: `${this.baseUrl}/${this.domain}/messages`,
      json: true,
      headers: this.defaultHeaders,
      form: this.createRequestBody(payload),
    };
    console.log('sending  email');
    await rp.post(options);
    return { success: true };
  }

  public createRequestBody(payload: IEmailTransportRequest): Object {
    return {
      from: payload.from,
      to: payload.to.join(', '),
      cc: payload.cc && payload.cc.join(', '),
      bcc: payload.bcc && payload.bcc.join(', '),
      subject: payload.subject,
      text: payload.body,
    };
  }

  public handleErrorResponse(error: any): never {
    // log error
    Boom.boomify(error, { statusCode: error.statusCode });
    throw error;
  }
}
