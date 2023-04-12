import { BadRequestException, Injectable } from '@nestjs/common';
import { RegistroUsuarioInput } from './dto/inputs/registro.input';
import { LoginUsuarioInput } from './dto/inputs/login.input';
import { AuthResponse } from './types/auth.response';
import { ServicioUsuarios } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  // Inyecto mi servicio de usuarios / servicio de JWT
  constructor(
    private readonly servicioUsuarios: ServicioUsuarios,
    private readonly servicioJWT: JwtService
  ){}

  // Obtenemos el token de usuario
  private getJwtToken(usuario: any): string {
    // Que hacemos aca?
    //firmamos el token con el id del usuario 
    return this.servicioJWT.sign({id: usuario.id});
  }

  async register(registroUsuarioInput: RegistroUsuarioInput): Promise<AuthResponse>{
    console.log({registroUsuarioInput});
    // Crear usuario
    const usuario = await this.servicioUsuarios.create(registroUsuarioInput);
    // Generar Token
    // const token = "ABC123"

    // Generar tokens con JWT
    const token = this.getJwtToken(usuario);

    // Devolver token y usuario creado, devuelto en el metodo de creacion de usuario
    return {token, usuario}
  }

  async login(loginUsuarioInput: LoginUsuarioInput): Promise<AuthResponse> {
    console.log({loginUsuarioInput});

    // Validar usuario
    const {email, password} = loginUsuarioInput;
    const usuario = await this.servicioUsuarios.findOneByEmail(email);

    console.log(usuario);
    console.log(bcrypt.compareSync(password, usuario.password));
    
    // En caso de coincidencia en contraseñas
    if(bcrypt.compareSync(password, usuario.password)) {
      // Genero token
      const token = this.getJwtToken(usuario);

      
      return {usuario, token}
    }

    throw new BadRequestException("Contraseña invalida, Intente de nuevo")
  }
  

  //revalidamos token cuando se refresca la pagina  / se cierra y se vuelve a abrir el navegador
  validarToken(usuario: Usuario): AuthResponse{

    // Generar tokens con JWT
    const token = this.getJwtToken(usuario);

    // Devolver token y usuario creado, devuelto en el metodo de creacion de usuario
    return {token, usuario}
    
    // throw new Error("Validando Token de usuario...");
  }


  // Validamos usuario y contraseña
  async validarUsuario(idUser: string): Promise<Usuario> {
    const user = await this.servicioUsuarios.findOneById(idUser);

    if(!user.active){
      throw new Error (`Usuario ${user.email}, ${user.roles} no esta activo`);
    }

    return user;
  }
}
