class BadRequestError extends Error {
  constructor (message, extra) {
      super();
      Error.captureStackTrace(this, this.constructor);
      this.name = 'BadRequest';
      this.message = message;
      this.json =  {message:this.message,status:400};
      this.status = 400;
      if (extra) {
          this.extra = extra;
      }
  }
}

module.exports = BadRequestError;