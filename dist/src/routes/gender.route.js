"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Models
const gender_models_1 = require("../models/gender.models");
// Controllers
const genders_controller_1 = __importDefault(require("../controllers/genders.controller"));
// Middlewares
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const router = express_1.default.Router();
exports.default = router
    .get('/', genders_controller_1.default.findAll)
    .get('/:id', genders_controller_1.default.findById)
    .post('/', auth_middleware_1.default, (0, validate_middleware_1.default)((0, gender_models_1.validate)('create')), genders_controller_1.default.createGender)
    .patch('/:id', auth_middleware_1.default, (0, validate_middleware_1.default)((0, gender_models_1.validate)('update')), genders_controller_1.default.updateGender)
    .delete('/:id', auth_middleware_1.default, genders_controller_1.default.deleteGender);
