// backend/server.js
const express = require("express");
const cors = require("cors");
const redis = require("redis");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to Redis
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || "redis",
  port: process.env.REDIS_PORT || 6379,
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

redisClient.connect().then(() => {
  console.log("Connected to Redis");
});

// Example endpoint to get a cached value
app.get("/api/data/:key", async (req, res) => {
  const { key } = req.params;
  try {
    const cachedValue = await redisClient.get(key);
    if (cachedValue) {
      return res.json({ source: "cache", value: cachedValue });
    } else {
      // Simulate fetching data from the database (not actually connected here)
      const databaseValue = `Data for ${key} from DB`;
      await redisClient.set(key, databaseValue, { EX: 3600 }); // Cache for 1 hour
      return res.json({ source: "database", value: databaseValue });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
