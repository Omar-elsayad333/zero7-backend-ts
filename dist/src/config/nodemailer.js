"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailer_user = process.env.MAILER_USER || '';
const mailer_pass = process.env.MAILER_PASS || '';
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.email',
    port: 587,
    auth: {
        user: mailer_user,
        pass: mailer_pass,
    },
});
const token = jsonwebtoken_1.default.sign({
    data: 'Token Data',
}, 'ourSecretKey', { expiresIn: '10m' });
// point to the template folder
const htmlTemplate = fs_1.default.readFileSync(path_1.default.join(__dirname, '..', 'public', 'mailTemplates', 'confirmationTemplate.html'), 'utf-8');
const generateMailConfigration = ({ name, subject, to, link, }) => {
    const mailConfigurations = {
        // It should be a string of sender/server email
        from: {
            name: 'Zero7',
            address: mailer_user,
        },
        to,
        // Subject of Email
        subject,
        // Email template
        html: htmlTemplate.replace('<%= recipientName %>', name).replace('<%= validationLink %>', link),
    };
    return mailConfigurations;
};
const sendMail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, subject, to, link }) {
    try {
        const config = generateMailConfigration({ name, subject, to, link });
        yield transporter.sendMail(config);
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = sendMail;
