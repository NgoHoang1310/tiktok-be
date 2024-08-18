import { createClient } from 'redis';
const client = createClient({ url: process.env.REDIS_URL });

// Xử lý lỗi kết nối
client.on('error', (err) => {
    console.error('Redis Client Error', err);
});

// Kết nối đến Redis server
async function connectRedis() {
    if (!client.isOpen) {
        try {
            await client.connect();
            console.log('Redis client connected !');
        } catch (error) {
            console.log('Redis client connect failed !');
        }
    }
}

// Ngắt kết nối khỏi Redis server
async function disconnectRedis() {
    if (client.isOpen) {
        try {
            await client.quit();
            console.log('Redis client disconnected !');
        } catch (error) {
            console.log('Redis client disconnected failed !');
        }
    }
}
export { client, connectRedis, disconnectRedis };
