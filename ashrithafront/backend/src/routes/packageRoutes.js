const express = require("express");
const PackageController = require("../controllers/packageController");

const router = express.Router();

router.get("/countries", PackageController.getCountriesAndAdventures);

router.get("/packages/:tour", PackageController.getPackageDetails);

router.get("/packages", PackageController.getPackages);

router.post("/packages/add", PackageController.addPackage);

module.exports = router;
