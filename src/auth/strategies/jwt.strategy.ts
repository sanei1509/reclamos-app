import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Usuario } from 'src/users/entities/user.entity';
import { JwtPayloadContract } from '../interfaces/jwt-payload.interface';
import { AuthService } from '../auth.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    //inyectar el servicio de autenticacion para extraer usuarios seguros
    private readonly authService: AuthService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }

  // El payload debe tener cierto contrato de estructura
  async validate(payload: JwtPayloadContract): Promise<Usuario>  {
    // console.log(payload);
    const {id} = payload;
    const usuario = this.authService.validarUsuario(id);

    delete (await usuario).password;
    console.log({usuario});

    return usuario;
    // throw new UnauthorizedException("Trabajando en la validación del token");
  }
}