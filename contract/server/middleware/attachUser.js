const jwtWebToken = require('jsonwebtoken')

// TODO: I don' think this is needed
// JWT seems to attach user regardless
// may override that default functionality and
// explicitly control user attachment here...
module.exports = function (req, res, next) {
  const authorizationHeader = req.headers.authorization
  if (authorizationHeader) {
    const token = authorizationHeader.split(' ')[1]
    const decoded = jwtWebToken.decode(token)
    req.user = { id: decoded.id, username: decoded.username, profile_id: decoded.profile_id }
  }
  next()
}