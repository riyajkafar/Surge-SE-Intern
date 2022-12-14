import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';

@Module({
  imports:[PassportModule, UserModule,JwtModule.registerAsync({useFactory:()=>({
    secret: 'secret',
    signOptions: {expiresIn: '3600s'},
  }),
}),
],
  providers: [AuthService, JwtGuard, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
