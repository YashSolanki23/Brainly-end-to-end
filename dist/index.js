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
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
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
app.post("/api/v1/content", middleware_1.middleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    await db_1.Content.create({
        link,
        type,
        title: req.body.title,
        //@ts-ignore
        userId: req.userId,
        tags: [],
    });
    res.json({
        message: "Content Added"
    });
});
app.get("/api/v1/content", middleware_1.middleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await db_1.Content.find({
        userId: userId
    }).populate("userId", "username");
    res.json({
        content
    });
});
app.delete("/api/v1/content", middleware_1.middleware, async (req, res) => {
    const contentId = req.body.contentId;
    await db_1.Content.deleteMany({
        contentId,
        //@ts-ignore
        userId: userId
    });
    res.json({
        "msg": "deleted"
    });
});
app.post("/api/v1/brain/share", middleware_1.middleware, async (req, res) => {
    const share = req.body.share;
    if (share) {
        const existingLink = await db_1.Link.findOne({
            //@ts-ignore
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        const hash = (0, utils_1.random)(10);
        await db_1.Link.create({
            //@ts-ignore
            userId: req.userId,
            hash: hash
        });
        res.json({
            hash
        });
    }
    else {
        await db_1.Link.deleteOne({
            //@ts-ignore
            userId: req.userId
        });
        res.json({
            "msg": "Removed Link"
        });
    }
});
//@ts-ignore
app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;
    const link = await db_1.Link.findOne({
        hash: hash
    });
    if (!link) {
        res.status(404).json({
            message: "Sorry, incorrect input"
        });
        return;
    }
    const content = await db_1.Content.find({
        userId: link.userId
    });
    const user = await db_1.User.findOne({
        _id: link.userId
    });
    if (!user) {
        res.status(404).json({
            message: "User not found"
        });
        return;
    }
    res.json({
        username: user.username,
        content: content
    });
});
app.listen(port, () => {
    console.log(`server is running at ${port}`);
});
//# sourceMappingURL=index.js.map