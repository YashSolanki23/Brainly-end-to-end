"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = exports.Content = exports.Tag = exports.User = void 0;
exports.Connect = Connect;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
dotenv_1.default.config();
async function Connect() {
    try {
        const mongoUrl = process.env.MongoDB;
        if (!mongoUrl) {
            throw new Error("MongoDB connection string is missing");
        }
        await mongoose_1.default.connect(mongoUrl);
        console.log("Database is running successfully!!!");
    }
    catch (error) {
        console.error("Database connection failed:", error);
    }
}
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
exports.User = mongoose_1.default.model('User', userSchema);
const tagSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true, unique: true }
});
exports.Tag = mongoose_1.default.model('Tag', tagSchema);
const contentype = ['image', 'audio', 'video', 'article'];
const contentSchema = new mongoose_1.default.Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentype, required: true },
    title: { type: String, required: String },
    tags: [{ type: mongoose_2.Schema.Types.ObjectId, ref: 'Tag' }],
    userId: [{ type: mongoose_2.Schema.Types.ObjectId, ref: 'User' }]
});
exports.Content = mongoose_1.default.model('Content', contentSchema);
const linkSchema = new mongoose_1.default.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose_2.Schema.Types.ObjectId, ref: 'User', required: true },
});
exports.Link = mongoose_1.default.model("Link", linkSchema);
//# sourceMappingURL=db.js.map