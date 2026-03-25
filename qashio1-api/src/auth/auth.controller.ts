import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({
    type: LoginDto,
    examples: {
      valid: {
        summary: 'Valid credentials',
        value: { email: 'user@example.com', password: 'password123' },
      },
      invalid: {
        summary: 'Invalid credentials',
        value: { email: 'wrong@example.com', password: 'wrongpass' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login success',
    schema: {
      example: {
        success: true,
        email: 'user@example.com',
        token: 'jwt-token',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login failure',
    schema: {
      example: {
        error: 'Invalid credentials',
      },
    },
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
