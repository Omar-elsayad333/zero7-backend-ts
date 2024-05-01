enum TMailTemplates {
  mailConfirmation = 'mailConfirmation',
}

interface IMailBase {
  to: string
  name: string
  subject: string
}

interface IMailEmailConfirmation extends IMailBase {
  link: string
}
