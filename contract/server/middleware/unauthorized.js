module.exports = function (err, req, res, next) {
  console.log(err)
  if (err.name === 'UnauthorizedError') {
    return (res.status(401).send({ message: 'Invalid authorization token' }));
  }
}