const router = require("express").Router();
const Post = require("../models/Post.model");
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");

//GET "/api/post/post-list" => Shows a list of all posts
router.get("/post-list", async (req, res, next) => {
    // console.log("postman accediendo a la ruta");
    try {
        const response = await Post.find();
        res.status(200).res.json(response)
    } catch (error) {
        next(error);
    }   
});


//POST "api/post/create" => receives details from new recipe in FE and creates new recipe in DB
router.post("create", async (req, res, next) => {
    const { _id } = req.payload;
    const { title, createdBy, text, image, date, comment} = req.body;

    const newPost = {
        title,
        createdBy: _id,
        text,
        image: req.body.image === "" ? undefined : req.body.image,
        date,
        // comment
    }
    console.log("newPost", newPost)

    try {
        await Post.create(newPost);
        res.status(201).json("New post created in DB")
    } catch (error) {
        // console.log("rellena name");
        next(error);
      }

})


//GET "api/post/:postId/details" => shows specific post
router.get("/:postId/details", async (req, res, next) => {
    
    const {postId} = req.params
    
    try {                                           //! do we need populate?
        const response = await Post.findById(postId).populate("createdBy");
        res.status(200).json(response)
    } catch (error) {
        next(error);
    }   

})
 

//PATCH "api/post/:postId/edit" => edit specific post
router.patch(":/postId/edit", async (req, res, next) => {

    const { title, createdBy, text, image, date, comment} = req.body;

    const {_id, role} = req.payload; //! to do all auth config
    const {postId} = req.params;

        //gets the new info to update
    const postUpdate = {
        
            title,
            createdBy: _id,
            text,
            // image: req.body.image,  //* with Cloudinary i think
            date,
            // comment
        
    };

    try {
        const postDetails = await Post.findById(postId);
          console.log(postDetails.createdBy, "is equal to ", _id);
        
        await Post.findByIdAndUpdate(req.params.postId, postDetails);
        res.status(200).json("Post updated successfully");
        console.log("postUpdate in recipe edit", postUpdate);

    } catch (error) {
    next(error);
    }
})


//DELETE "api/post/:postId/delete" =>  delete specific recipe
//! si ponemos middleware isAdmin, esta ruta solo servirá para el admin. Con el condicional, serviria para user que crea receta i admin. Doblamos la ruta?
router.delete("/:postId/delete", async (req, res, next) => {
// router.delete("/:postId/delete", isLogged, async (req, res, next) => {

    
    const {postId} = req.params;
    const {_id, role} = req.payload; //! to do all auth config

    try {
        const postDetails = await Post.findById(postId);
        if (postDetails.createdBy == _id || role === "admin") { //!maybe not needed the createdBy
          await Post.findByIdAndDelete(postId);
          res.status(200).json("Post deleted");
        }
      } catch (error) {
        next(error);
      }

})




module.exports = router;
 