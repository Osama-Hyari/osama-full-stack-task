import { Injectable } from '@nestjs/common';
import { KafkaProducerService } from '../kafka-producer.service';
import { LoginDto } from './dto/login.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly kafkaProducer: KafkaProducerService) {}

  async login(loginDto: LoginDto) {
    // Use environment variables for default user
    const demoUser = {
      email: process.env.DEFAULT_EMAIL || 'user@example.com',
      password: process.env.DEFAULT_PASSWORD || 'password123',
    };

    if (
      loginDto.email === demoUser.email &&
      loginDto.password === demoUser.password
    ) {
      // Generate JWT token
      const token = jwt.sign(
        { email: demoUser.email },
        process.env.JWT_SECRET || 'default_secret',
        { expiresIn: '1h' }
      );
      // Publish login_success event to Kafka
      await this.kafkaProducer.sendMessage('login_events', {
        event: 'login_success',
        email: demoUser.email,
        timestamp: new Date().toISOString(),
      });
      return {
        success: true,
        email: demoUser.email,
        token,
      };
    }
    return {
      error: 'Invalid credentials',
    };
  }
}
