import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import {PassportModule} from '@nestjs/passport'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [AuthResolver, AuthService, JwtStrategy],
  imports: [
  // quiero utilizar dentro de mi modulo lo que expone el modulo de USUARIOS
  UsersModule,
  ConfigModule,     
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject:  [ConfigService],
    // secret: process.env.JWT_SECRET,
    // signOptions: { expiresIn: '60s' },
    // Con la siguiente funcion queremos inyectar las dependencias
    useFactory: (configService : ConfigService) => {
      console.log(configService);
      return {
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES_IN')
        }
      }
    }
  }),
]
})
export class AuthModule {}
