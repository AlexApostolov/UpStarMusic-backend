const Artist = require('../models/artist');

/**
 * Finds a single artist in the artist collection.
 * @param {object} artistProps - Object containing a name, age, yearsActive, and genre
 * @return {promise} A promise that resolves with the Artist that was created
 */
module.exports = artistProps => {
  // artistProps variable is an object with age, genre, name, & yearsActive from the form fields
  const artist = new Artist(artistProps);

  return artist.save();
};
