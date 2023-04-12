import { Args, ID, Int, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { type } from 'os';

import { Reclamo } from './entity/reclamo.entity';
import { CrearReclamoInput, ActualizarReclamoInput} from './dto/inputs'; 
import { ReclamosService } from './reclamos.service';
import { IsUUID } from 'class-validator';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guards';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Usuario } from 'src/users/entities/user.entity';

// Nuestro resolver va a responder todo lo relacionado a los RECLAMOS (tickets)
@Resolver(() => Reclamo)
@UseGuards(JwtAuthGuard)
export class ReclamosResolver {
    // Inyeccion del servicio
    constructor(
        private readonly reclamosService: ReclamosService
        // private readonly usuariosService: UsuariosService
    ) {}

    // ADMIN Traer todos los reclamos, arreglo de reclamos
    @Query(() => [Reclamo], {name: "ListarReclamos", description: "Listar todos los tickets de reclamos DB"})
    async getAllReclamos(): Promise<Reclamo[]> {
        //devuelvo el arreglo de reclamos
        return this.reclamosService.getAllReclamos();
    }

    // USER Traer todos los reclamos de un usuario, arreglo de reclamos
    @Query(() => [Reclamo], {name: "ListarReclamosUsuario", description: "Listar todos los tickets de reclamos de un usuario"})
    async getReclamosByUser(@CurrentUser() usuario: Usuario): Promise<Reclamo[]> {
        //devuelvo el arreglo de reclamos
        return this.reclamosService.getReclamosByUser(usuario);
    }

    // USER traer un reclamo correspondiente al usuario no otros.
    @Query(() => Reclamo, {name: "BuscarReclamoUsuario", description: "Listar un ticket solicitado por app de usuario logueado"})
    async getReclamoByUser(
        @Args('id', {type: () => ID}, ParseUUIDPipe)id: string,
        @CurrentUser() usuario: Usuario
    ): Promise<Reclamo>{
        return this.reclamosService.getReclamoByUser(id, usuario);
    }

    //ADMIN Traer un reclamo por id / DE cualquier usuario
    @Query(() => Reclamo, {name: "SolicitarReclamoID", description: "Listar un ticket solicitado por app"})
    async getReclamoById(@Args('id', {type: () => ID}, ParseUUIDPipe)id: string
    ): Promise<Reclamo>{
        return this.reclamosService.getReclamoById(id);
    }

    // Crear un reclamo
    @Mutation(() => Reclamo, {name: "CrearReclamo", description: "Crear un nuevo ticket de reclamo"}) 
    async createReclamo(
        @Args('crearReclamoInput') crearReclamoInput: CrearReclamoInput,
        @CurrentUser() usuario: Usuario
    ):  Promise<Reclamo> {
        return this.reclamosService.create(crearReclamoInput, usuario);
    }

    // Actualizar un reclamo por id
    @Mutation(() => Reclamo, {name: "ActualizarReclamo", description: "Actualizar un ticket de reclamo existente enviando ID"})
    async updateReclamo(
        @Args('actualizarReclamoInput') actualizarReclamoInput: ActualizarReclamoInput,
    ): Promise<Reclamo>{
        return this.reclamosService.update(actualizarReclamoInput.id ,actualizarReclamoInput)
    }

    // Borrar un reclamo por id permanente
    @Mutation(() => Reclamo, {name: "EliminarReclamoFisicamente", description: "Borrar un ticket de reclamo existente de DB"})
    async deleteReclamo(
        @Args('id', {type: () => ID}) id: string
    ): Promise<Reclamo>{
        return this.reclamosService.delete(id);
    }

    //Dar de baja a un reclamo por id
    @Mutation(() => Reclamo, {name: "EliminarReclamoLogicamente", description: "Dar de baja un ticket de reclamo existente de DB"})
    async deleteReclamoLogicamente(
        @Args('id', {type: () => ID}) id: string
    ): Promise<Reclamo>{
        return this.reclamosService.deleteLogicamente(id);
    }
    

    // Traer reclamos por palabra clave (descripcion, problematica)
    @Query(() => [Reclamo], {name: "ReclamosPorPalabraClave", description: "Listar todos los tickets que tengan en su titulo o problema por ej = 'Falla' "})
    async getReclamoPorPalabraClave(
        @Args('palabraClave') palabraClave: string
    // ): Reclamo[]{
    ): Promise<Reclamo[]>{
        return this.reclamosService.getReclamoPorPalabraClave(palabraClave.toLocaleLowerCase().trim())
    }


}
