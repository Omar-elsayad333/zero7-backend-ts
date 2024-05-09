"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bucket = exports.admin = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
exports.admin = firebase_admin_1.default;
const zero7_406120_firebase_adminsdk_atmoz_79c9bba6a5_json_1 = __importDefault(require("./zero7-406120-firebase-adminsdk-atmoz-79c9bba6a5.json")); // Download from Firebase Console
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(zero7_406120_firebase_adminsdk_atmoz_79c9bba6a5_json_1.default),
    storageBucket: 'zero7-406120.appspot.com', // Replace with your bucket name
});
const bucket = firebase_admin_1.default.storage().bucket();
exports.bucket = bucket;
