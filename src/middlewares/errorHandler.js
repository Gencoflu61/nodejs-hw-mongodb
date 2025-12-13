export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';

  res.status(status).json({
    status: status === 500 ? 500 : status,
    message: status === 500 ? 'Something went wrong' : message,
    data: err.message || err,
  });
};
