const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/moviesController")


router.get("/",moviesController.index);
router.get("/:id",moviesController.show);
router.post("/:id/reviews",moviesController.createReview) // post http://localhost:3001/movies/:id/reviews
// router.get("/:id",moviesController.update);
// router.get("/:id",moviesController.delete);



module.exports = router