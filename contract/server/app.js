const path = require('path')
const express = require('express')
const app = express()
const config = require('config')
const jwt = require('express-jwt')
const exampleRoutes = require('./router/example')
const userRoutes = require('./router/user')
const editProfileRoutes = require('./router/editProfile')
const profileRoutes = require('./router/profile')
const contractRoutes = require('./router/conSearch')
const orderRoutes = require('./router/conOrder')
const protectedRoutes = require('./router/protected')
const unauthorized = require('./middleware/unauthorized')
const attachUser = require('./middleware/attachUser')
const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(unauthorized)
app.use(attachUser)

app.use('/api', exampleRoutes)
app.use('/api', userRoutes)
app.use('/api', editProfileRoutes)
app.use('/api', profileRoutes)
app.use('/api', contractRoutes)
app.use('/api', orderRoutes)
app.use('/api', jwt({ secret: config.get('secret'), algorithms: ['RS256'] }), protectedRoutes)

// used for deployment...
app.use(express.static(path.join(__dirname, '../../', 'client', 'build')));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../../', 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})