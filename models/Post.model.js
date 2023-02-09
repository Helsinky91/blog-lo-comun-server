const { Schema, model } = require("mongoose");

const postSchema = new Schema(

    {
        title: {
            type: String,
            required: true,
        },
        createdBy: {
            //feeds from User.model
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        text: String,
        image: {
            type: String,
            default:
                "https://res.cloudinary.com/ddzhdj4yd/image/upload/v1668514029/whatcha-cookin/RecetaDefault_lxygod.png",
        },
        //TODO cambiar fecha, mirar Worklog App
        date: String,
        comment: {
            //feeds from Comment.model
            type: Schema.Types.ObjectId,
            ref: "Comment",
        }

    }
);

const Post = model("Post", postSchema);

module.exports = Post;
