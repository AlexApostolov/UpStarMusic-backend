const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  title: String,
  date: Date, // Reference to the global date object inside JavaScript
  copiesSold: Number,
  numberTracks: Number,
  image: String,
  revenue: Number // Store currency as raw number--no dollar sign or commas--to easily convert currency/format
});

module.exports = AlbumSchema;
