"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Express session
const express_session_1 = __importDefault(require("express-session"));
// Mongo session
const connect_mongo_1 = __importDefault(require("connect-mongo"));
// Utils
const secrets_1 = require("../utils/secrets");
const mongoUrl = secrets_1.MONGODB_URI;
const sessionSecret = process.env.SESSION_SECRET || '';
const sessionOptions = {
    mongoUrl: mongoUrl,
    ttl: 60 * 60,
};
const sessionConfig = (0, express_session_1.default)({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        // Enable only for HTTPS
        httpOnly: true,
        // Prevent client-side access to cookies
        sameSite: 'strict',
        // Mitigate CSRF attacks
    },
    store: connect_mongo_1.default.create(sessionOptions),
});
exports.default = sessionConfig;
