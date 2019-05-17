export interface IEmailTransportRequest {
  from?: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string;
}

export interface IEmailTransportResponse {
  success: boolean;
}
