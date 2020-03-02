const express = require("express");
const redis = require('redis');

const router = express.Router();

const client = redis.createClient({
  host: 'redis-server',
  port: 6379
});
client.set('visits', 0);

router.get("/", (req, res) => {
  client.get('visits', (err, visits) => {
    res.send('Number of visits is ' + visits);
    client.set('visits', parseInt(visits) + 1);
  });
});

module.exports = router;
