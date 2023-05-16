const errorMap = {
  INVALID_VALUE: 400,
  INVALID_FIELDS: 400,
  INVALID_TOKEN: 401,
  USER_NOT_FOUND: 404,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  mapError,
};
