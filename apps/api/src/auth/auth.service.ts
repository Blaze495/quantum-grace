import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  /**
   * Register a new user
   */
  async register(registerDto: RegisterDto) {
    // Check if user exists
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // Hash password
    const hashedPassword = await hash(registerDto.password, 12);

    // Create user
    const user = await this.usersService.create({
      email: registerDto.email,
      name: registerDto.name,
      password: hashedPassword,
    });

    this.logger.log(`New user registered: ${user.email}`);

    // Generate token
    const token = this.generateToken(user.id, user.email);

    return {
      user: this.sanitizeUser(user),
      token,
    };
  }

  /**
   * Login user
   */
  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    const token = this.generateToken(user.id, user.email);

    return {
      user: this.sanitizeUser(user),
      token,
    };
  }

  /**
   * Validate user credentials
   */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  /**
   * Generate JWT token
   */
  private generateToken(userId: string, email: string): string {
    const payload = { sub: userId, email };
    return this.jwtService.sign(payload);
  }

  /**
   * Remove sensitive data from user object
   */
  private sanitizeUser(user: any) {
    const { password, ...sanitized } = user;
    return sanitized;
  }

  /**
   * Verify JWT token
   */
  async verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  /**
   * Handle OAuth login (Google, GitHub, Apple)
   * Finds or creates user, then generates JWT
   */
  async handleOAuthLogin(oauthUser: any) {
    const { provider, providerId, email, name, picture } = oauthUser;

    if (!email) {
      throw new UnauthorizedException('Email is required from OAuth provider');
    }

    // Try to find user by email
    let user = await this.usersService.findByEmail(email);

    if (user) {
      // Update existing user with OAuth info if needed
      this.logger.log(`Existing user logged in via ${provider}: ${email}`);
    } else {
      // Create new user from OAuth data
      user = await this.usersService.create({
        email,
        name,
        password: null, // OAuth users don't have passwords
        // You can add additional fields like:
        // provider,
        // providerId,
        // picture,
      });
      
      this.logger.log(`New user created via ${provider}: ${email}`);
    }

    // Generate JWT token
    const access_token = this.generateToken(user.id, user.email);

    return {
      access_token,
      user: this.sanitizeUser(user),
    };
  }
}
