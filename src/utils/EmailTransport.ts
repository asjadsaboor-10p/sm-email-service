import { IEmailTransportRequest, IEmailTransportResponse } from '../interfaces/index';

export abstract class EmailTransport {
  public apiKey: string;
  public defaultHeaders: Object;
  public baseUrl: string;
  public domain: string | undefined;

  constructor(apiKey: string, domain?: string) {
    this.apiKey = apiKey;
    this.domain = domain;
  }

  public abstract sendEmail(payload: IEmailTransportRequest): Promise<IEmailTransportResponse>;

  public abstract createRequestBody(payload: IEmailTransportRequest): Object;

  public abstract handleErrorResponse(error: any): never;
}
