const Tour = require("../models/Tour");
const Reviews = require("../models/Review");

const getCountriesAndAdventures = async (req, res) => {
  try {
    const result = await Tour.find({}, { country: 1, adventureType: 1 });

    const data = { countries: [], adventureType: [] };

    for (let i = 0; i < result.length; i++) {
      if (!data.countries.includes(result[i].country)) {
        data.countries.push(result[i].country);
      }

      if (!data.adventureType.includes(result[i].adventureType)) {
        data.adventureType.push(result[i].adventureType);
      }
    }

    res.send({ status: "Success", data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Fail", message: err });
  }
};

const getPackages = async (req, res) => {
  try {
    const { featured, location, month, adventure } = req.query;

    const query = {};

    if (location) query.country = location;
    if (month) query.availableMonths = month;
    if (adventure) query.adventureType = adventure;
    if (featured) query.featured = true;

    const data = await Tour.find(query).populate({
      path: "reviews",
      select: "-createdAt -updatedAt -_id -tourId",
    });

    res.send({ status: "Success", data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Fail", message: err });
  }
};

const getPackageDetails = async (req, res) => {
  try {
    const { tour } = req.params;

    const data = await Tour.findById(tour).populate({
      path: "reviews",
      select: "-updatedAt -_id -tourId",
      populate: {
        path: "user",
        select: "username email", // Include only the "name" and "email" fields from the user document
      },
    });

    res.send({ status: "Success", data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Fail", message: err });
  }
};

const addPackage = async (req, res) => {
  try {
    const tour = new Tour({
      title: "Classical Italy2",
      subTitle: "From Rome to Venice",
      itenary:
        "Start in Rome and end in Venice! With the Explorer tour Classical Italy, you have a 5 days tour package taking you through Rome, Italy and 2 other destinations in Italy. Classical Italy includes accommodation in a hotel as well as an expert guide, insurance, meals, transport and more.",
      tags: ["Family", "Fully Guided"],
      tourOperator: "On The Go Tours",
      OperatedIn: "English",
      maxGroupSize: 20,
      highlights: [
        "Glide on a gondola through the canals of Venice.",
        "Indulge in a food coma of pasta and pizza in Rome.",
        "Whisk through the striking Italian countryside.",
      ],
      images: [
        "https://cdn.tourradar.com/s3/tour/1500x800/102240_5e31724a8dc88.jpg",
      ],
      reviews: [],
      country: "Italy",
      availableMonths: ["September", "July", "August"],
      adventureType: "Group Adventures",
      featured: true,
      price: 525,
    });

    await tour.save();

    const review = new Reviews({
      tourId: tour._id,
      user: "648d56c663ac1cf1686ca8a8",
      reviewText: "Lorem ipsum",
      rating: 5,
    });

    const reviewData = await review.save();

    tour.reviews.push(reviewData._id);

    await tour.save();

    res.send(tour);
  } catch (err) {
    console.log(err)
    res.send({ status: 'Fail' })
  }
};

module.exports = {
  addPackage,
  getPackages,
  getPackageDetails,
  getCountriesAndAdventures,
};
