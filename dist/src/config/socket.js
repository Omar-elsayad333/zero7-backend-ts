"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const secrets_1 = require("../utils/secrets");
const socketConfig = {
    cors: {
        origin: secrets_1.FRONT_URL,
    },
};
exports.default = socketConfig;
