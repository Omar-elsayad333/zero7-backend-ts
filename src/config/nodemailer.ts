import fs from 'fs'
import path from 'path'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import { MailOptions } from 'nodemailer/lib/json-transport'

const mailer_user = process.env.MAILER_USER || ''
const mailer_pass = process.env.MAILER_PASS || ''

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.email',
  port: 587,
  auth: {
    user: mailer_user,
    pass: mailer_pass,
  },
})

const token = jwt.sign(
  {
    data: 'Token Data',
  },
  'ourSecretKey',
  { expiresIn: '10m' },
)

// point to the template folder
const htmlTemplate = fs.readFileSync(
  path.join(__dirname, '..', 'public', 'mailTemplates', 'confirmationTemplate.html'),
  'utf-8',
)

const mailConfigurations: MailOptions = {
  // It should be a string of sender/server email
  from: {
    name: 'Zero7',
    address: mailer_user,
  },

  to: 'kklskull1234@gmail.com, omarelsayad313@gmail.com',

  // Subject of Email
  subject: 'Email Verification',

  // Email template
  html: htmlTemplate
    .replace('<%= recipientName %>', 'ahmed mohamed')
    .replace('<%= validationLink %>', `http://localhost:3000/verify/${token}`),
}

const sendMail = async ({ mailTypes }: IMailBase) => {
  try {
    await transporter.sendMail(mailConfigurations)
  } catch (error) {
    console.log(error)
  }
}

export default sendMail
