const mongoose = require('mongoose');
const AlbumSchema = require('./album');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: String,
  age: Number, // A DOB as a String would need no future updates
  yearsActive: Number, // A start date for career would need no future updates
  image: String,
  genre: String,
  website: String,
  netWorth: Number, // Label should have currency name in it, not assume USD
  labelName: String,
  retired: Boolean,
  albums: [AlbumSchema]
});

const Artist = mongoose.model('Artist', ArtistSchema);
module.exports = Artist;
