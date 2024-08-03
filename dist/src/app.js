"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const i18n_1 = __importDefault(require("i18n"));
const path_1 = __importDefault(require("path"));
const lusca_1 = __importDefault(require("lusca"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const errorhandler_1 = __importDefault(require("errorhandler"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Config
require("./config/i18n");
const cors_2 = __importDefault(require("./config/cors"));
const db_1 = require("./config/db");
const session_1 = __importDefault(require("./config/session"));
const passport_2 = __importDefault(require("./config/passport"));
const rateLimite_1 = __importDefault(require("./config/rateLimite"));
// Utils
const secrets_1 = require("./utils/secrets");
// Middlewares
const response_middleware_1 = __importDefault(require("./middlewares/response.middleware"));
// Router
const routes_1 = __importDefault(require("./routes"));
// Express app
exports.app = (0, express_1.default)();
// Use common 3rd-party middlewares
exports.app.use((0, compression_1.default)());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(lusca_1.default.xframe('SAMEORIGIN'));
exports.app.use(lusca_1.default.xssProtection(true));
exports.app.use((0, cors_1.default)(secrets_1.isProd ? cors_2.default : undefined));
exports.app.use(body_parser_1.default.json());
exports.app.use(body_parser_1.default.urlencoded({ extended: true }));
exports.app.use((0, morgan_1.default)('dev'));
// Apply rate limiter to all requests
exports.app.use(rateLimite_1.default);
// Apply express session
exports.app.use(session_1.default);
// Apply localization to all API routes
exports.app.use(i18n_1.default.init);
// Initialize Passport
exports.app.use(passport_1.default.initialize());
exports.app.use(passport_1.default.session());
// Applay Passport config
(0, passport_2.default)();
// App routes
(0, routes_1.default)();
// Custom API response handler
exports.app.use(response_middleware_1.default);
// Route for the home page
exports.app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public', 'homeTemplate', 'home.html'));
});
// Connect to DB
(0, db_1.connectDB)();
// Error Handler. Provides full stack - remove for production
!secrets_1.isProd && exports.app.use((0, errorhandler_1.default)());
exports.default = exports.app;
