const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
  // Base query using helper function buildQuery
  const query = Artist.find(buildQuery(criteria))
    /* sortProperty here is not an array but an ES6 interpolated key: at runtime look at the sortProperty variable,
    whatever string it's equal to add that property to this object, & then give it a value of 1. The ES5 approach:
    const sortOrder = {};
    sortOrder[sortProperty] = 1; */
    .sort({ [sortProperty]: 1 })
    // Add on the 2 query modifiers
    .skip(offset)
    .limit(limit);
  /*  */
  return Promise.all([query, Artist.count()]).then(results => {
    /* "results" is an array with 1st element of query results & 2nd element of # of artists.
        Then return it as an object as is required by the frontend. */
    return {
      all: results[0],
      count: results[1],
      offset: offset,
      limit: limit
    };
  });
};

const buildQuery = criteria => {
  // We won't modify "criteria", but modify the object below to send as a query to the DB
  const query = {};

  /* If a user doesn't utilize any of the UI filters/sorting, "criteria" is just {name: ""},
  so check what's on criteria.
  Eventually, it'll be passed through Artist.find() above. */
  if (criteria.name) {
    /* An index is a system that MongoDB uses to make very efficient queries whenever you're looking for data.
    An index is automatically created on the _id field of every record to allow for fast lookup, but you can create
    your own "indexes" for any property that you look up often, e.g. the "name" searched for below. */
    query.$text = { $search: criteria.name };
  }

  if (criteria.age) {
    // Use the greater/lesser than or equal to MongoDB operators
    query.age = {
      $gte: criteria.age.min,
      $lte: criteria.age.max
    };
  }

  if (criteria.yearsActive) {
    query.yearsActive = {
      $gte: criteria.yearsActive.min,
      $lte: criteria.yearsActive.max
    };
  }

  return query;
};
