import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistroUsuarioInput } from 'src/auth/dto/inputs/registro.input';
import { Repository } from 'typeorm';
import { CrearUsuarioInput } from './dto/create-user.input';
import { ActualizarUsuarioInput } from './dto/update-user.input';
import { Usuario } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ServicioUsuarios {
  //El logger es un servicio que nos permite registrar eventos en la consola
  private readonly logger: Logger = new Logger('UsuariosService')

  // inyectamos nuestro repositorio
  constructor(
    @InjectRepository(Usuario)
    private readonly repositorioUsuarios: Repository<Usuario>
  ){}

  //  Metodo Creacion / Registro de usuario
  async create(registroUsuarioInput: RegistroUsuarioInput) {
    try{
      // create crea una instancia de la entidad pero no la guarda en la base de datos
      // save guarda la instancia en la base de datos
      registroUsuarioInput.password = await bcrypt.hash(registroUsuarioInput.password, 10)
      const nuevoUsuario = this.repositorioUsuarios.create(registroUsuarioInput)

      // persistimos el nuevo usuario en la base de datos y retornamos el usuario creado
     return await this.repositorioUsuarios.save(nuevoUsuario)
    }
    catch(error){
      this.manejarErrores(error)
    }
  }

  // METODO : listar todos los usuarios
  async findAll(): Promise<Usuario[]> {
    // buscamos todos los usuarios
    const usuarios = await this.repositorioUsuarios.find();
    return usuarios;
  }

  // METODO : Buscar usuario por id
  async findOneById(id: string): Promise<Usuario> {
    try{
      const user = await this.repositorioUsuarios.findOne({where: {id}});
      console.log(user);
      console.log(`Usuario ${user.email}, ${user.roles} Listo para retorno`)
      return user;
    }
    catch(error){
      throw new NotFoundException(`Usuario de id "${id}" no encontrado en la base de datos`)
    }
  }

  //METODO : Buscar usuario por email
  async findOneByEmail(email: string): Promise<Usuario> {
    //buscamos todos los usuarios
    const usuarios = await this.findAll();

    //recorremos todos los usuarios
    for (const usuario of usuarios) {
      //si el usuario tiene el email que estamos buscando
      if (usuario.email === email) {
        //retornamos el usuario
        return usuario;
      }
    }
        throw new Error("Usuario no encontrado en la base de datos")

}

  // METODO : actualizarUsuario
  async update(id: string, updateUserInput: ActualizarUsuarioInput, usuarioQueActualiza: Usuario): Promise<Usuario> {
    try {
        // vamos a usar el preload para evitar que se cree un nuevo usuario
        // y se cree una nueva relacion con el usuario
        const usuarioActualizado = this.repositorioUsuarios.preload({
          ...updateUserInput,
          id
        });

        //uso el await porque el preload retorna una promesa
        // (await usuarioActualizado).ultimaModificacion = usuarioQueActualiza;

        return usuarioActualizado;
   }
    catch(error){
      this.manejarErrores(error)
    }
  }

  remove(id: string): string {
    throw new Error("Metodo no implementado aun")
    return `This action removes a #${id} user`;
  }

  // METODO : Baja lógica de usuario.
  async bloqueoDeUsuarios(id: string, usuarioAdmin: Usuario): Promise<Usuario> {
    const usuarioABloquear = await this.findOneById(id);

    if (usuarioABloquear) {
      usuarioABloquear.active = false;
      usuarioABloquear.ultimaModificacion = usuarioAdmin;
      //persistimos el nuevo usuario en la base de datos y retornamos el usuario creado
      return await this.repositorioUsuarios.save(usuarioABloquear);
    }

    return usuarioABloquear;
  }

  // HANDLE ERRORS
  private manejarErrores(error: any): never{
    this.logger.error(error);

    if (error.code === '23505') {
      throw new BadRequestException('Ya existe un usuario con este correo en la aplicación')
    }

    throw new InternalServerErrorException('Error en la base de datos, revisa los logs');
  }
}
