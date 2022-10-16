// @flow
import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import v1Routes from './routes/v1Routes.js'

const app = express()
const port = process.env.PORT || 8080

app.use(cors())

// parse requests of content-type - application/json
app.use(bodyParser.json())

// add v1 routes
app.use('/api/v1', v1Routes)

// listen for requests
const server = app.listen(port, () => {
  console.log(`Service is listening on port ${port}`)
})

// export for testing purpose
module.exports = server
