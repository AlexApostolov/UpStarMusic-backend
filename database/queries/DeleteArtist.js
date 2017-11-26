const Artist = require('../models/artist');

/**
 * Deletes a single artist from the Artists collection
 * @param {string} _id - The ID of the artist to delete.
 * @return {promise} A promise that resolves when the record is deleted
 */
module.exports = _id => {
  /* One line solution is best: only touch the DB once.
  Usually CRUD operations in Mongoose can be done in a simple 1 line */
  return Artist.remove({ _id });
};
