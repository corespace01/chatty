import mongoose, { Schema } from "mongoose"
import User from "./user.model.js"
import { text } from "express"

const messageSchema = new mongoose.Schema(
    {
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        text:{
            type:String
        },
        image: {
            type: String
        }
    },
    {timestamps: true}
);

const Message = mongoose.model("Message", messageSchema);
export default Message;