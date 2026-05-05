export interface MailPayload {
  to: string | string[];
  from: string;
  subject: string;
  text: string;
  html?: string;
  template?: string;
  context?: { [key: string]: any };
  attachments?: any[];
}
