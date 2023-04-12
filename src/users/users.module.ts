import { Module } from '@nestjs/common';
import { ServicioUsuarios } from './users.service';
import { UsuariosResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/user.entity';

@Module({
  providers: [UsuariosResolver, ServicioUsuarios],
  imports: [
    TypeOrmModule.forFeature([Usuario])
  ],
  //para poder utilizar el servicio en otros modulos [Auth Module]
  exports: [ServicioUsuarios, TypeOrmModule]
})
export class UsersModule {}
