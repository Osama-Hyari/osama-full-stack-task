import { Injectable } from '@nestjs/common';

@Injectable()
/**
 * Provides application-wide helper methods used by root controllers.
 */
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      service: 'expense-tracker-api',
      timestamp: new Date().toISOString(),
    };
  }
}
