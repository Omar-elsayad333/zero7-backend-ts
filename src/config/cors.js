"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const corsConfig = {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    credentials: true, // Allow cookies and credentials
};
exports.default = corsConfig;
