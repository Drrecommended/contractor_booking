module.exports = function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return (res.status(401).send({ message: 'Invalid authorization token' }));
  }
}