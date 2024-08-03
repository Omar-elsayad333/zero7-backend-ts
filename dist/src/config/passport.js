"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const clientID = process.env.GOOGLE_CLIENT_ID || '';
const callbackURL = process.env.GOOGLE_CALLBACK_URL || '';
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || '';
const passportConfig = () => passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID,
    clientSecret,
    callbackURL,
}, (accessToken, refreshToken, profile, done) => {
    // Code to handle user authentication and retrieval
    return done(null, profile);
}));
// // Serialize and deserialize  user
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((obj, done) => {
    done(null, obj);
});
exports.default = passportConfig;
