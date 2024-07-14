import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post()
  @ApiOperation({
    description: 'To register a new user with email',
    summary: 'Register user with details',
  })
  create(@Body() registerData: RegisterUserDto) {
    return this.authService.register(registerData);
  }

  @Get()
  @ApiOperation({
    description: 'Login with email',
    summary: 'Endpoint to login with user email and password',
  })
  login(@Body() LoginData: LoginDto){
    return this.authService.login(LoginData);
  }
}
