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
      select: "-createdAt -updatedAt -_id -tourId",
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

module.exports = {
  getPackages,
  getPackageDetails,
  getCountriesAndAdventures,
};
