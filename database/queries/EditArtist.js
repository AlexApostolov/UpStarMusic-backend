const Artist = require('../models/artist');

/**
 * Edits a single artist in the Artists collection
 * @param {string} _id - The ID of the artist to edit.
 * @param {object} artistProps - An object with a name, age, yearsActive, and genre
 * @return {promise} A promise that resolves when the record is edited
 */
module.exports = (_id, artistProps) => {
  // NOTE: If you use .update() you'd pass in _id as an object { _id }
  return Artist.findByIdAndUpdate(_id, artistProps);
};
