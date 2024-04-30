enum TMailTemplates {
  mailConfirmation = 'mailConfirmation',
}

interface IMailBase {
  to: string
  name: string
  subject: string
  mailTypes: string
}

interface IMailEmailConfirmation extends IMailBase {
  link: string
}
