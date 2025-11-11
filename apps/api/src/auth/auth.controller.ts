import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Res,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Response, Request as ExpressRequest } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('session')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user session' })
  async getSession(@Request() req: ExpressRequest) {
    return {
      user: (req as any).user,
    };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout user' })
  async logout() {
    // For JWT, logout is handled client-side by removing the token
    return {
      message: 'Logout successful',
    };
  }

  // ========== Google OAuth ==========
  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Initiate Google OAuth flow' })
  async googleAuth() {
    // Redirect handled by Google strategy
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google OAuth callback' })
  async googleAuthCallback(@Req() req: ExpressRequest, @Res() res: Response) {
    const user: any = req.user;
    const jwtToken = await this.authService.handleOAuthLogin(user);
    
    const frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';
    res.redirect(`${frontendUrl}/auth/callback?token=${jwtToken.access_token}`);
  }

  // ========== GitHub OAuth ========== (TEMPORARILY DISABLED)
  // @Get('github')
  // @UseGuards(AuthGuard('github'))
  // @ApiOperation({ summary: 'Initiate GitHub OAuth flow' })
  // async githubAuth() {
  //   // Redirect handled by GitHub strategy
  // }

  // @Get('github/callback')
  // @UseGuards(AuthGuard('github'))
  // @ApiOperation({ summary: 'GitHub OAuth callback' })
  // async githubAuthCallback(@Req() req: ExpressRequest, @Res() res: Response) {
  //   const user: any = req.user;
  //   const jwtToken = await this.authService.handleOAuthLogin(user);
  //   
  //   const frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';
  //   res.redirect(`${frontendUrl}/dashboard?token=${jwtToken.access_token}`);
  // }

  // ========== Apple OAuth ========== (TEMPORARILY DISABLED)
  // @Get('apple')
  // @UseGuards(AuthGuard('apple'))
  // @ApiOperation({ summary: 'Initiate Apple Sign In flow' })
  // async appleAuth() {
  //   // Redirect handled by Apple strategy
  // }

  // @Post('apple/callback')
  // @UseGuards(AuthGuard('apple'))
  // @ApiOperation({ summary: 'Apple Sign In callback' })
  // async appleAuthCallback(@Req() req: ExpressRequest, @Res() res: Response) {
  //   const user: any = req.user;
  //   const jwtToken = await this.authService.handleOAuthLogin(user);
  //   
  //   const frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';
  //   res.redirect(`${frontendUrl}/dashboard?token=${jwtToken.access_token}`);
  // }
}
