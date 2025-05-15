import { createClient } from "redis";
import "dotenv/config";

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

redisClient.on("error", (err) => {
  console.error("Redis client Error on connection", err);
});

redisClient.on("connect", () => {
  console.error("Redis client readys");
});

export default redisClient;
