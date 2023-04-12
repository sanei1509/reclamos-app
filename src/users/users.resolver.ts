import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ServicioUsuarios } from './users.service';
import { Usuario } from './entities/user.entity';
import { CrearUsuarioInput } from './dto/create-user.input';
import { ActualizarUsuarioInput } from './dto/update-user.input';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { RolesValidos } from 'src/auth/enums/roles-validos.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guards';

@Resolver(() => Usuario)
@UseGuards(JwtAuthGuard)
export class UsuariosResolver {
  constructor(private readonly servicioUsuarios: ServicioUsuarios) {}

  @Query(() => [Usuario], { name: 'ListarUsuarios', description: 'Listar todos los usuarios'})
  async findAll(): Promise<Usuario[]> {
    return this.servicioUsuarios.findAll();
  }

  @Query(() => Usuario, { name: 'BuscarUsuarioByID' , description: 'Buscar usuario por ID' })
  async findOne(@Args('id', { type: () => ID }) id: string)
  : Promise<Usuario> {
    return this.servicioUsuarios.findOneById(id);
  }

  // Actualizacion/modificacion de usuario
  @Mutation(() => Usuario, { name: 'ActualizarUsuario', description: 'Actualizar roles, datos de un usuario'})
  async updateUser(@Args('actualizarUsuarioInput') actualizarUsuarioInput: ActualizarUsuarioInput, @CurrentUser([RolesValidos.admin]) usuario: Usuario) { 
    return this.servicioUsuarios.update(actualizarUsuarioInput.id, actualizarUsuarioInput, usuario);
  }

  // Eliminado permanente
  @Mutation(() => Usuario, {name: "EliminarUsuario", description: "Eliminación permanente de un usuario"})
  removeUsuario(@Args('id', { type: () => ID }) id: string) {
    return this.servicioUsuarios.remove(id);
  }

  // Baja logica de usuario
  @Mutation(() => Usuario, {name: 'BajaDeUsuario', description: "Baja logica de un usuario"})
  async BlockUser(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser([RolesValidos.admin]) usuario : Usuario
    ): Promise<Usuario> {
    return this.servicioUsuarios.bloqueoDeUsuarios(id, usuario);
  }

}
