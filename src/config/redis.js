import '../bootstrap';
import redisMock from 'redis-mock';

const redis =
  process.env.NODE_ENV === 'test'
    ? redisMock.createClient()
    : {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      };
export default redis;
