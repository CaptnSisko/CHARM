// Local imports
const secret = require('./secret').keys;
const log = require('./middleware/log');
const { corsOptions } = require('./config/corsOptions');
const { errorHandler } = require('./middleware/errorHandler');

// External imports
const cors = require('cors');
const express = require('express');
const mariadb = require('mariadb');
const { query } = require('express');

// Setup application and database
const app = express();
const pool = mariadb.createPool(secret.db_config);

// Logging
app.use(log.reqLogger);

// Set up middleware
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));

// Endpoint to check connection and API key
app.get('/', (req, res) => {
  if (req.query.key === secret.client.key)
    res.status(200).json({ message: 'Authentication success. Welcome to the CHARM API.' });
  else
    res.status(401).json({ error: 'Authentication failure.' });
});

// GET all node data
// FUTURE: Make the database and frontend field names more consistent to make
// this function require less in terms of data formatting
app.get('/nodes', async (req, res) => {
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
      );

      // Update data format
      result = result.reduce(
        (prev, curr) => {
          // Data formatting
          prev[curr.id] = curr;
          prev[curr.id].location = {
            lat: curr.lat,
            lng: curr.lon
          };
          prev[curr.id].lastSeen = curr.timestamp;
          delete prev[curr.id].lat;
          delete prev[curr.id].lon;
          delete prev[curr.id].timestamp;

          // Filter any null keys
          for (const key in prev[curr.id]) {
            if (prev[curr.id][key] === null)
              delete prev[curr.id][key];
          }

          return prev;
        }, 
        {}
      );

      // Return the data
      res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed in querying server database.' });
  }
});

// POST sensor data
app.post('/telemetry', async (req, res) => {
  // Check the API key
  if (req.query.key !== secret.client.key) {
    res.status(401).json({ error: 'Authentication failure.' });
    return;
  }

  // Check for id, timestamp, location
  if (!('id' in req.query && 'timestamp' in req.query)) {
    res.status(400).json({ error: 'Missing id or timestamp.' });
    return;
  }

  if(!('lat' in req.query)) {
    req.query.lat = 'NULL';
  }

  if(!('lon' in req.query)) {
    req.query.lon = 'NULL';
  }

  // Validate numeric fields
  const time = Number(req.query.timestamp);
  if (!(Number.isInteger(time) && time > 0)) {
    res.status(400).json({ error: 'Timestamp is not valid.' });
    return;
  }
  if (isNaN(Number(req.query.lat)) || isNaN(Number(req.query.lon))) {
    req.query.lat = 'NULL';
    req.query.lon = 'NULL';
    // res.status(400).json({ error:  'Lat or lon are not valid numbers.' });
    // return;
  }

  // Validate ID
  if (req.query.id.length <= 9) {
    const validId = await pool.query(`SELECT * FROM nodes WHERE id='${req.query.id}'`);
    if (validId.length !== 1) {
      res.status(400).json({ error: 'Invalid node ID passed.' });
      return;
    }
  } else {
    res.status(400).json({ error: 'ID field is too long.' });
    return;
  }

  // Start query setup
  const queryColumns = ['id', 'timestamp', 'lat', 'lon'];
  const queryValues = [`'${req.query.id}'`, req.query.timestamp, req.query.lat, req.query.lon];

  // Push optional arguments
  if ('voltage' in req.query && !isNaN(Number(req.query.voltage))) {
    queryColumns.push('voltage');
    queryValues.push(req.query.voltage);
  }
  if ('clientCount' in req.query) {
    const clientCount = Number(req.query.clientCount);
    if (Number.isInteger(clientCount) && clientCount >= 0) {
      queryColumns.push('clientCount');
      queryValues.push(req.query.clientCount);
    }
  }
  if ('meshCount' in req.query) {
    const meshCount = Number(req.query.meshCount);
    if (Number.isInteger(meshCount) && meshCount >= 0) {
      queryColumns.push('meshCount');
      queryValues.push(req.query.meshCount);
    }
  }

  // Write to the database
  try {
    const result = await pool.query(
      `
      INSERT INTO telemetry
      (${queryColumns.join(', ')}) VALUES
      (${queryValues.join(', ')});
      `
    );
    if (result.affectedRows !== 1 || result.warningStatus !== 0)
      throw 'Failure in validation of databased write';
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed insertion into server database.' });
    return;
  }

  // Successful write
  res.status(200).json({ error: 'Successful query.' });
});

// Error handling and logging
app.use(errorHandler);

// Start listening for requests
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Test app listening on port ${port}`);
});