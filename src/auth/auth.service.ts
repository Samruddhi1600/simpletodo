import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { DatabaseService } from 'src/database/database.service';
import * as bycrypt from 'bcrypt';
import { hash } from 'crypto';
import { NotFoundError } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { validate } from 'class-validator';
@Injectable()
export class AuthService {
  constructor(
    private readonly dataservice: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}
  async login(loginData: LoginDto) {
    const { email, password } = loginData;
    const user = await this.dataservice.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const validatePassword = await bycrypt.compare(password, user.password);
    if (!validatePassword) {
      throw new NotFoundException('Password is incorrect');
    }

    return {
      token: this.jwtService.sign({ email }),
    };
  }

  async register(registerData: RegisterUserDto) {
    const user = await this.dataservice.user.findFirst({
      where: { email: registerData.email },
    });
    if (user) {
      throw new BadGatewayException('User with email already exists');
    }
    registerData.password = await bycrypt.hash(registerData.password, 10);
    const res = await this.dataservice.user.create({ data: registerData });
    return res;
  }
}
