"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_password = void 0;
exports.HashPassword = HashPassword;
exports.VerifyPassword = VerifyPassword;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Salt = 12;
exports.JWT_password = "!123!456";
async function HashPassword(password) {
    const hashed = await bcrypt_1.default.hash(password, Salt);
    return hashed;
}
async function VerifyPassword(password, hash) {
    const verify = await bcrypt_1.default.compare(password, hash);
    return verify;
}
//# sourceMappingURL=config.js.map