const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  username: {
    //feeds from User.model
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    //feeds from Post.model
    type: Schema.Types.ObjectId,
    ref: "Post",
    type: String,
  },
  comentario: String,
   //TODO cambiar fecha, mirar Worklog App
   fecha: String,
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
