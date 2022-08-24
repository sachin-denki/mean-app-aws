let BadRequestError = require('../error/badRequestError');
let AccessDeniedError = require('../error/accessDeniedError');

let onError = (err, req, res, next) => {
  res.status(err.status );
  if (err instanceof   BadRequestError || err instanceof   AccessDeniedError  ) {
    res.json(err.json);
    return next();
  }
} 

module.exports = {
  onError:onError
};