import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationsGateway } from './notifications/notifications.gateway';
import { Inject } from '@nestjs/common';

@Controller()
export class KafkaConsumerController {
  constructor(
    @Inject(NotificationsGateway)
    private readonly notificationsGateway: NotificationsGateway,
  ) {}


  @MessagePattern('transactions')
  async handleTransactionEvent(@Payload() message: any) {
    if (message && message.value) {
      let data;
      try {
        data = JSON.parse(message.value.toString());
      } catch (err) {
        console.error('Failed to parse Kafka message value (transactions):', err, message.value);
        return false;
      }
      this.notificationsGateway.server.emit('transactionEvent', data);
      return true;
    }
    // If message is already an object, emit as is
    this.notificationsGateway.server.emit('transactionEvent', message);
    return true;
  }

  @MessagePattern('login_events')
  async handleLoginEvent(@Payload() message: any) {
    if (message && message.value) {
      let data;
      try {
        data = JSON.parse(message.value.toString());
      } catch (err) {
        console.error('Failed to parse Kafka message value (login_events):', err, message.value);
        return false;
      }
      this.notificationsGateway.server.emit('loginEvent', data);
      return true;
    }
    // If message is already an object, emit as is
    this.notificationsGateway.server.emit('loginEvent', message);
    return true;
  }
}
