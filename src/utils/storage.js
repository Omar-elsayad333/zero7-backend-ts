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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMultipleFilesToFirebase = exports.uploadeFileToFirebase = void 0;
const firebase_1 = require("@/config/firebase");
const storage_1 = require("firebase-admin/storage");
const generate_1 = require("@/utils/generate");
const uploadeFileToFirebase = (file, folderPath) => __awaiter(void 0, void 0, void 0, function* () {
    const fileExt = (0, generate_1.generateFileExt)(file);
    const uniqueFilename = `${folderPath}/${(0, generate_1.generateUniqueSuffix)(fileExt)}`;
    const bucketFile = firebase_1.bucket.file(uniqueFilename);
    yield bucketFile.save(file.buffer, { contentType: file.mimetype });
    const fileRef = firebase_1.bucket.file(uniqueFilename);
    const url = yield (0, storage_1.getDownloadURL)(fileRef);
    return url;
});
exports.uploadeFileToFirebase = uploadeFileToFirebase;
const uploadMultipleFilesToFirebase = (files, folderPath) => __awaiter(void 0, void 0, void 0, function* () {
    const urls = [];
    for (const file of files) {
        const fileExt = (0, generate_1.generateFileExt)(file);
        const uniqueFilename = `${folderPath}/${(0, generate_1.generateUniqueSuffix)(fileExt)}`;
        const bucketFile = firebase_1.bucket.file(uniqueFilename);
        yield bucketFile.save(file.buffer, { contentType: file.mimetype });
        const fileRef = firebase_1.bucket.file(uniqueFilename);
        const url = yield (0, storage_1.getDownloadURL)(fileRef);
        urls.push(url);
    }
    return urls;
});
exports.uploadMultipleFilesToFirebase = uploadMultipleFilesToFirebase;
