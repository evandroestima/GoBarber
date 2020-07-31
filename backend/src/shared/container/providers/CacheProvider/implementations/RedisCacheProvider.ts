import ICacheProvider from "../models/ICacheProvider";
import Redis, { Redis as RedisClient } from "ioredis";
import cacheConfig from "@config/cache";

class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;
  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }
  public async invalidate(key: string): Promise<void> {}
  public async recover(key: string): Promise<string | null> {
    const data = await this.client.get(key);
    return data;
  }
  public async save(key: string, value: string): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`);
    const pipeline = this.client.pipeline();

    keys.forEach((key) => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }
}
export default RedisCacheProvider;
