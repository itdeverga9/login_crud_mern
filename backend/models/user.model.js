import mongoose from "mongoose";
import schemaOptions from "./schemaOptions.js";
import crypto from "crypto";

const User = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
            required: true,
            select: false
        }
    },
    schemaOptions
)

User.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString("hex");

    this.password = crypto.pbkdf2Sync(
        password,
        this.salt,
        1000,
        64,
        "sha512"
    ).toString("hex");
}

User.methods.validPassword = function (password) {
    const hash = crypto.pbkdf2Sync(
        password,
        this.salt,
        1000,
        64,
        "sha512"
    ).toString("hex");
    return this.password === hash;
}

export default mongoose.model("User", User)