const Artist = require('../models/artist');

/**
 * Finds the lowest and highest yearsActive of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max yearsActive, like { min: 0, max: 14 }.
 */
module.exports = () => {
  const minQuery = Artist.find({})
    .sort({ yearsActive: 1 })
    /* A .then() here would've returned a potentially huge amount of records to your server from the DB, instead have the DB limit to just the one you need on the DB side */
    .limit(1)
    /* You only care about the yearsActive of this artist.
    NOTE: the limit() is returning 1 artist but as an array because of .find({}) */
    .then(artists => artists[0].yearsActive);

  const maxQuery = Artist.find({})
    .sort({ yearsActive: -1 })
    .limit(1)
    .then(artists => artists[0].yearsActive);

  return Promise.all([minQuery, maxQuery]).then(result => {
    // We need an object returned
    return { min: result[0], max: result[1] };
  });
};
