import { IEmailTransportRequest, IEmailTransportResponse } from '../interfaces/index';

export abstract class EmailTransport {
  apiKey: string;
  defaultHeaders: Object;
  baseUrl: string;
  domain: string | undefined;

  constructor(apiKey: string, domain?: string) {
    this.apiKey = apiKey;
    this.domain = domain;
  }

  abstract sendEmail(payload: IEmailTransportRequest): Promise<IEmailTransportResponse>;

  abstract createRequestBody(payload: IEmailTransportRequest): Object;

  abstract handleErrorResponse(error: any): never;
}
