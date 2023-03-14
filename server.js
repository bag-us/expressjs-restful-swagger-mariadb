const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const basicAuth = require('express-basic-auth')
const helmet = require('helmet')

//Swagger
const swaggerUI = require('swagger-ui-express')
const apiDoc = require('./apidocs/mobil.json')
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(apiDoc))
//EndSwagger

app.use(helmet())

// app.use(basicAuth({
//   users: {'admin' : 'passwordnya'},
//   unauthorizedResponse: basicAuthResponse
// }))
// function basicAuthResponse(req){
//   return req.basicAuth 
//     ? ('Crecentials'+ req.auth.user + ':' + req.auth.password + 'rejected')
//     : 'Unauthorized'
// }

app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// Folder Route
// const mobilRoute = require("./routes/mobil")
const mobilRoute = require("./routes/mobil-orm")
const ownerRoute = require("./routes/owner")
const axiosRoute = require("./routes/axios")

app.use('/mobil', mobilRoute)
app.use('/owner', ownerRoute)
app.use('/axios', axiosRoute)


// Global Route
app.use((req, res, next) => {
  const error = new Error("Page Not Found");
  error.status = 404;
  next(error);
})
// Query Error
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error:{
      message: error.message
    }
  })
})

app.listen(6060, () => {
  console.log('Example app listening on port 6060!')
})
