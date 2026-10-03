import mongoose from "mongoose";
import { Schema } from "mongoose";
export declare function Connect(): Promise<void>;
export declare const User: mongoose.Model<{
    username: string;
    password: string;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    username: string;
    password: string;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    username: string;
    password: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    username: string;
    password: string;
}, mongoose.Document<unknown, {}, {
    username: string;
    password: string;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    username: string;
    password: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    username: string;
    password: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    username: string;
    password: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const Tag: mongoose.Model<{
    title: string;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    title: string;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    title: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    title: string;
}, mongoose.Document<unknown, {}, {
    title: string;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    title: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    title: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    title: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const Content: mongoose.Model<{
    link: string;
    type: string;
    title?: string | null;
    tags: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId[];
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    link: string;
    type: string;
    title?: string | null;
    tags: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId[];
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    link: string;
    type: string;
    title?: string | null;
    tags: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId[];
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    link: string;
    type: string;
    title?: string | null;
    tags: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId[];
}, mongoose.Document<unknown, {}, {
    link: string;
    type: string;
    title?: string | null;
    tags: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId[];
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    link: string;
    type: string;
    title?: string | null;
    tags: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId[];
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    link: string;
    type: string;
    title?: string | null;
    tags: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId[];
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    link: string;
    type: string;
    title?: string | null;
    tags: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId[];
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=db.d.ts.map