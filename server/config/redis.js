const Redis = require("ioredis")

const redis = new Redis({
    port: 11625,
    host: "redis-11625.c93.us-east-1-3.ec2.redns.redis-cloud.com",
    username: "default",
    password: process.env.REDIS,
    db: 0
})

module.exports = redis;