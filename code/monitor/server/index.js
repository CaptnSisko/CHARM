// Local imports
const secret = require('./secret').keys
const log = require('./middleware/log')
const { corsOptions } = require('./config/corsOptions')
const { errorHandler } = require('./middleware/errorHandler')

// External imports
const cors = require('cors')
const express = require('express')
const mariadb = require('mariadb')

// Setup application and database
const app = express()
const pool = mariadb.createPool(secret.db_config)

// Logging
app.use(log.reqLogger)

// Set up middleware
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }))

// Metadata endpoint
app.get('/', async (req, res) => {
  if (req.query.key === secret.client.key) {
    res.status(200).json({ message: 'Authentication success. Welcome to the CHARM API.' })
  }
  res.status(401).json({ error: 'Authentication failure.' })
})

// GET all node data

// POST sensor data

// Error handling and logging
app.use(errorHandler)

// Start listening for requests
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Test app listening on port ${port}`)
})