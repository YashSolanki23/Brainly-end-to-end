"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const middleware = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({
            message: "You are not logged in"
        });
    }
    const parts = header.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(403).json({
            message: "Invalid Authorization Token"
        });
    }
    const token = parts[1];
    try {
        //@ts-ignore
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_password);
        if (typeof decoded === "string") {
            return res.status(403).json({
                message: "Invalid Token"
            });
        }
        //@ts-ignore
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        return res.status(403).json({
            message: "You are not logged in"
        });
    }
};
exports.middleware = middleware;
//# sourceMappingURL=middleware.js.map