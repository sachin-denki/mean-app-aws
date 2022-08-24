// let BadRequestError = require('./baderror')

// let onError = (err, req, res, next) => {
//   //console.log('Inside error listener.',err);

//   res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR);

//   /**
//    * Handle known errors first.
//    */
//   if (err instanceof AccessDeniedError || err instanceof BadRequestError || err instanceof UnauthorizedError || err instanceof EntityNotFoundError) {
//       res.json(err.json);

//       return next();
//   }

//   return next(err);
// };

// module.exports ={onError:onError}