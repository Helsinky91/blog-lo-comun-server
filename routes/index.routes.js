const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

//set up for post/routes.js to start with "/post/..."
const postRoutes = require("./post.routes");
router.use("/post", postRoutes);




module.exports = router;
