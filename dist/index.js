"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const app = (0, express_1.default)();
const port = 3000;
(0, db_1.Connect)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/api/v1/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const hashe = await (0, config_1.HashPassword)(password);
        await db_1.User.create({
            username: username,
            password: hashe
        });
        res.json({
            msg: "User signed up"
        });
    }
    catch (e) {
        res.status(411).json({
            message: "User already Exists"
        });
    }
});
app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.username;
    try {
        const existingUser = await db_1.User.findOne({
            username
        });
        if (!existingUser) {
            return res.status(403).json({
                message: "Incorrect credentials"
            });
        }
        const isPasswordCorrect = await (0, config_1.VerifyPassword)(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(403).json({
                message: "Incorrect credentials"
            });
        }
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id
        }, config_1.JWT_password);
        return res.json({
            token
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});
app.post("/api/v1/content", (req, res) => {
});
app.get("/api/v1/content", (req, res) => {
});
app.listen(port, () => {
    console.log(`server is running at ${port}`);
});
//# sourceMappingURL=index.js.map