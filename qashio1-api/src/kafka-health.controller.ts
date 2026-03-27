import { Controller, Get } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Controller('kafka-health')
export class KafkaHealthController {
  private kafka = new Kafka({
    brokers: [process.env.KAFKA_BROKER || 'kafka:9092'],
  });

  @Get()
  async checkKafka() {
    try {
      const admin = this.kafka.admin();
      await admin.connect();
      await admin.disconnect();
      return {
        status: 'ok',
        info: { kafka: { status: 'up' } },
        error: {},
        details: { kafka: { status: 'up' } },
      };
    } catch (e) {
      return {
        status: 'error',
        info: {},
        error: { kafka: { status: 'down', message: e.message } },
        details: { kafka: { status: 'down', message: e.message } },
      };
    }
  }
}
