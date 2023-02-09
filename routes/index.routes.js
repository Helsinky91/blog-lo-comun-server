const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

//set up for auth.routes.js to start "/auth/..."
const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

//set up for post/routes.js to start with "/post/..."
const postRoutes = require("./post.routes");
router.use("/post", postRoutes);




module.exports = router;
