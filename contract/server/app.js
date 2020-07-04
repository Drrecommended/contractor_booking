const express = require('express')
const app = express()
const config = require('config')
const jwt = require('express-jwt')
const exampleRoutes = require('./router/example')
const userRoutes = require('./router/user')
const profileRoutes = require('./router/profile')
const contractRoutes = require('./router/conSearch')
const orderRoutes = require('./router/conOrder')
const protectedRoutes = require('./router/protected')
const unauthorized = require('./middleware/unauthorized')
const attachUser = require('./middleware/attachUser')
const PORT = 3001

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(unauthorized)
app.use(attachUser)

app.use('/api', exampleRoutes)
app.use('/api', userRoutes)
app.use('/api', profileRoutes)
app.use('/api', contractRoutes)
app.use('/api', orderRoutes)
app.use('/api', jwt({ secret: config.get('secret'), algorithms: ['RS256'] }), protectedRoutes)

app.use('/', (req, res, next) => {
  res.json({ message: 'hi' })
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})