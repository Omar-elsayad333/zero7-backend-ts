export enum TMailTemplates {
  mailConfirmation = 'mailConfirmation',
}

export interface IMailBase {
  to: string
  name: string
  subject: string
}

export interface IMailEmailConfirmation extends IMailBase {
  link: string
}
