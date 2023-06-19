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
  const tour = new Tour({
    title: "Land of the Northern Lights - 5 days",
    subTitle: "Start and end in Reykjavik",
    itenary:
      "Start and end in Reykjavik! With the Explorer tour Land of the Northern Lights - 5 days, you have a 5 days tour package taking you through Reykjavik, Iceland and 7 other destinations in Iceland. Land of the Northern Lights - 5 days includes accommodation in a hotel as well as an expert guide, meals, transport and more.",
    tags: ["Family", "Northern Lights", "Fully Guided"],
    tourOperator: "On The Go Tours",
    OperatedIn: "English",
    maxGroupSize: 23,
    highlights: [
      "Explore Iceland's colourful capital, where every street bursts with cool Nordic style",
      "Unwind and rejuvenate in the mineral-rich waters of the infamous Blue Lagoon",
      "Spend your nights in the stunning countryside, the ideal spot for the Northern Lights",
    ],
    images: [
      "https://cdn.tourradar.com/s3/tour/1500x800/71605_b9b3d98c.jpg",
      "https://cdn.tourradar.com/s3/tour/1500x800/71605_78880fe2.jpg",
      "https://cdn.tourradar.com/s3/review/1500x800/118075_f1da442f.jpg",
      "https://cdn.tourradar.com/s3/review/1500x800/118075_89fd4921.jpg",
    ],
    country: "Iceland",
    availableMonths: ["June", "July", "August"],
    adventureType: "Group Adventures",
    featured: true,
    price: 2500,
  });

  const res = await tour.save();
  return res;
};

module.exports = {
  addPackage,
  getPackages,
  getPackageDetails,
  getCountriesAndAdventures,
};
