const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
    itenary: {
      type: String,
      required: true,
    },
    tags: [{ type: String }],
    images: [{ type: String }],
    tourOperator: { type: String },
    OperatedIn: { type: String },
    price: {
      type: Number,
      required: true,
    },
    maxGroupSize: {
      type: Number,
      required: true,
    },
    highlights: [{ type: String }],
    availableMonths: [{ type: String }],
    adventureType: { type: String },
    country: { type: String },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
