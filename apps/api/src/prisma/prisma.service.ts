import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('✅ Connected to database');
    } catch (error) {
      if (process.env.SKIP_DB === 'true') {
        this.logger.warn('⚠️ Failed to connect to database, but continuing because SKIP_DB=true');
      } else {
        throw error;
      }
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.logger.log('❌ Disconnected from database');
    } catch {
      // ignore disconnect errors in SKIP_DB mode
    }
  }

  /**
   * Clean up all data (useful for testing)
   */
  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Cannot clean database in production');
    }

    const models = Reflect.ownKeys(this).filter((key) => {
      const keyStr = String(key);
      return keyStr[0] !== '_';
    });

    return Promise.all(models.map((modelKey) => (this as any)[modelKey as string].deleteMany()));
  }
}
