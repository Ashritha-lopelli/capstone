const express = require("express");
const ReviewController = require("../controllers/reviewController");

const router = express.Router();

router.get("/reviews", ReviewController.fetchReviews);

module.exports = router;
