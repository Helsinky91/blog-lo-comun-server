const router = require("express").Router();

router.post("/", (req, res, next) => {
    console.log("postman accediendo a la ruta");

    res.json("todo bien")
})

module.exports = router;
