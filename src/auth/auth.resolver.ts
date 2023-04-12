import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { RegistroUsuarioInput } from './dto/inputs/registro.input';
import { LoginUsuarioInput } from './dto/inputs/login.input';
import { AuthResponse } from './types/auth.response';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth-guards';
import { CurrentUser } from './decorators/current-user.decorator';
import { Usuario } from 'src/users/entities/user.entity';
import { RolesValidos } from './enums/roles-validos.enum';


// Que tipo de dato vamos a retornar por lo general
@Resolver(() => AuthResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // Vamos a gestionar 2 cosas desde aqui: Login y Register
  @Mutation(() => AuthResponse, {name: "Register", description: "Registro de Usuario en la base de datos, Generar Auth Token"})
  async register(/*Input*/ @Args('registroUsuarioInput') registroUsuarioInput: RegistroUsuarioInput): Promise<AuthResponse> {
    return this.authService.register(registroUsuarioInput);
  }

  
  @Mutation(() => AuthResponse, {name: "Login", description: "Inicio de sesión de Usuario, Incluir Auth Token"})
  async login(/*Input*/@Args('loginUsuarioInput') loginUsuarioInput: LoginUsuarioInput ): Promise<AuthResponse> {
    return this.authService.login(loginUsuarioInput);
  }

  // Validación de Token
  @Query(() => AuthResponse, {name: "ValidoToken", description: "Validar Token de Usuario, Devuelve datos del usuario"})
  @UseGuards( JwtAuthGuard )
  //solo los usuarios con rol admin pueden acceder a esta ruta
  validoToken(@CurrentUser([RolesValidos.user]) usuario : Usuario): AuthResponse{
    console.log({usuario})
    return this.authService.validarToken(usuario);

    // throw new Error("Method not implemented.");
  }

  // Validación usuario
  @Query(() => AuthResponse, {name: "ValidoUsuario", description: "Validar Usuario, Devuelve datos del usuario"})
  @UseGuards( JwtAuthGuard )
  validoUsuario(/*Current USER*/): AuthResponse{
    // return this.authService.validarUsuario(id);
    throw new Error("Method not implemented.");
  }

}
