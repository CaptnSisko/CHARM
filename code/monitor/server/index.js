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

// Endpoint to check connection and API key
app.get('/', (req, res) => {
  if (req.query.key === secret.client.key)
    res.status(200).json({ message: 'Authentication success. Welcome to the CHARM API.' })
  else
    res.status(401).json({ error: 'Authentication failure.' })
})

// GET all node data
app.get('/nodes', async (req, res) => {
  // Check the API key
  if (req.query.key !== secret.client.key) {
    res.status(401).json({ error: 'Authentication failure.' })
    return
  }

  try {
      // Launch query for latest telemetry per-node
      let result = await pool.query(
        `
        SELECT mostRecent.*
        FROM telemetry mostRecent
        INNER JOIN 
          (SELECT id, MAX(timestamp) AS maxtime
          FROM telemetry
          GROUP BY id) groupedMostRecent
        ON mostRecent.id=groupedMostRecent.id
        AND mostRecent.timestamp=groupedMostRecent.maxtime
        `
      )
      // TODO: Javascript data formatting
      res.status(200).json(result)
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: 'Failed in querying server database.' })
  }
})

// POST sensor data

// Error handling and logging
app.use(errorHandler)

// Start listening for requests
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Test app listening on port ${port}`)
})