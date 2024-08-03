"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserTokens = exports.getTokenExpDate = exports.checkRefreshTokenExp = exports.checkAccessTokenExp = exports.createRefreshToken = exports.createAccesToken = void 0;
// 3rd party libs
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = process.env.JWT_SECRET || '';
// Create access token
const createAccesToken = (tokenPayload) => {
    return jsonwebtoken_1.default.sign(tokenPayload, jwtSecret, { expiresIn: '1h' });
};
exports.createAccesToken = createAccesToken;
// Create refresh token
const createRefreshToken = (tokenPayload) => {
    return jsonwebtoken_1.default.sign(tokenPayload, jwtSecret, { expiresIn: '15d' });
};
exports.createRefreshToken = createRefreshToken;
// Check the expiretion of access token
const checkAccessTokenExp = (accessToken) => {
    const decodedAccessToken = jsonwebtoken_1.default.decode(accessToken);
    if (!decodedAccessToken || !decodedAccessToken.exp) {
        throw Error('Failed to decode access token');
    }
    const accessTokenExpireAt = new Date(decodedAccessToken.exp * 1000);
    if (accessTokenExpireAt < new Date()) {
        throw Error('Access token has expired');
    }
};
exports.checkAccessTokenExp = checkAccessTokenExp;
// Check the expiretion of refresh token
const checkRefreshTokenExp = (refreshToken) => {
    const decodedRefreshToken = jsonwebtoken_1.default.decode(refreshToken);
    if (!decodedRefreshToken || !decodedRefreshToken.exp) {
        throw Error('Failed to decode Refresh token');
    }
    const refreshTokenExpireAt = new Date(decodedRefreshToken.exp * 1000);
    if (refreshTokenExpireAt < new Date()) {
        throw Error('Refresh token has expired');
    }
};
exports.checkRefreshTokenExp = checkRefreshTokenExp;
// Get token expiration date
const getTokenExpDate = (token) => {
    const decodedToken = jsonwebtoken_1.default.decode(token);
    if (!decodedToken || !decodedToken.exp) {
        throw Error('Failed to decode token');
    }
    const tokenExpDate = new Date(decodedToken.exp * 1000);
    return tokenExpDate;
};
exports.getTokenExpDate = getTokenExpDate;
const createUserTokens = (_id) => {
    const tokens = {
        accessToken: createAccesToken({ _id }),
        refreshToken: createRefreshToken({ _id }),
    };
    tokens.accessToken && (tokens.accessTokenExpireAt = getTokenExpDate(tokens.accessToken));
    tokens.refreshToken && (tokens.refreshTokenExpireAt = getTokenExpDate(tokens.refreshToken));
    return tokens;
};
exports.createUserTokens = createUserTokens;
