import { Schema, model, ObjectId, Types } from "mongoose";

const postSchema = new Schema({
    title: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,

    },
    imageUrl: {
        type: String,
        required: true,

    },
    autor: {
        type: Types.ObjectId,
        ref: 'Posts',
        required: true,

    },
    comments: [
        { type: Types.ObjectId, ref: 'Comment' }
    ]
}, {
    timestamps: true,
    versionKey: false
})



export default model("Post", postSchema)