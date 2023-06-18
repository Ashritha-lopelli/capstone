const Reviews = require("../models/Review");
const Tour = require("../models/Tour");

const fetchReviews = async (req, res) => {
  try {
    const { tour: tourId } = req.query;

    const query = {};

    if (tourId) query.tourId = tourId;

    const data = await Reviews.find(query).populate({
      path: "user",
      select: "email username",
    });

    res.send({ status: "Success", data });
  } catch (err) {
    res.status(500).send({ status: "Fail", message: err });
  }
};

module.exports = {
  fetchReviews,
};
