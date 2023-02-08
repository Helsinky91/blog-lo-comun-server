const { Schema, model } = require("mongoose");

const postSchema = new Schema(

    {
        titulo: {
            type: String,
            required: true,
        },
        createdBy: {
            //feeds from User.model
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        texto: String,
        imagen: {
            type: String,
            default:
                "https://res.cloudinary.com/ddzhdj4yd/image/upload/v1668514029/whatcha-cookin/RecetaDefault_lxygod.png",
        },
        //TODO cambiar fecha, mirar Worklog App
        fecha: String,
        comentario: {
            //feeds from Comment.model
            type: Schema.Types.ObjectId,
            ref: "Comment",
        }

    }
);

const Post = model("Post", postSchema);

module.exports = Post;
