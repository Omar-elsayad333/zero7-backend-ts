"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// App
const app_1 = require("@/app");
// Routes
const test_route_1 = __importDefault(require("@/routes/test.route"));
const auth_route_1 = __importDefault(require("@/routes/auth.route"));
const user_route_1 = __importDefault(require("@/routes/user.route"));
const notifications_route_1 = __importDefault(require("@/routes/notifications.route"));
const category_route_1 = __importDefault(require("@/routes/category.route"));
const color_route_1 = __importDefault(require("@/routes/color.route"));
const size_route_1 = __importDefault(require("@/routes/size.route"));
const gender_route_1 = __importDefault(require("@/routes/gender.route"));
const product_route_1 = __importDefault(require("@/routes/product.route"));
const apiSuffix = `/api/${process.env.BASE_API_VERSION}`;
const routes = () => {
    // Test router
    app_1.app.use(`${apiSuffix}/test`, test_route_1.default);
    // Auth router
    app_1.app.use(`${apiSuffix}/auth`, auth_route_1.default);
    // User router
    app_1.app.use(`${apiSuffix}/user`, user_route_1.default);
    // Notifications router
    app_1.app.use(`${apiSuffix}/notifications`, notifications_route_1.default);
    // Categories router
    app_1.app.use(`${apiSuffix}/categories`, category_route_1.default);
    // Colors router
    app_1.app.use(`${apiSuffix}/colors`, color_route_1.default);
    // Sizes router
    app_1.app.use(`${apiSuffix}/sizes`, size_route_1.default);
    // Genders router
    app_1.app.use(`${apiSuffix}/genders`, gender_route_1.default);
    // Products router
    app_1.app.use(`${apiSuffix}/products`, product_route_1.default);
};
exports.default = routes;
