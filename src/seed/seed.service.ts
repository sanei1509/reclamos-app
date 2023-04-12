import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Reclamo } from 'src/reclamos/entity/reclamo.entity';
import { Usuario } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SEED_RECLAMOS, SEED_USUARIOS } from './data/seed-data';
import { ServicioUsuarios } from 'src/users/users.service';
import { ReclamosService } from 'src/reclamos/reclamos.service';

@Injectable()
export class SeedService {
    //Queremos saber si estamos en produccion o en desarrollo
    private production: boolean;

    constructor(
        private readonly configService: ConfigService,
        // Enlace a nuestra base de datos
        @InjectRepository(Reclamo)
        private reclamosRepository: Repository<Reclamo>,
        @InjectRepository(Usuario) 
        private readonly usuarioRepository: Repository<Usuario>,
        //inyectamos nuestro servicio de usuarios para poder crear
        private readonly servicioUsuarios: ServicioUsuarios,
        private readonly servicioReclamos: ReclamosService
        ) {
        this.production = this.configService.get('STATE') === 'prod' ? true : false;
    }


    // EXecute seed o Carga de datos
    async seed(): Promise<boolean> {
        //Verificamos que no estemos en produccion
        if (this.production){
            throw new UnauthorizedException('No se puede ejecutar el seed en producción');
        }
        // 1. Limpiar la base de datos para que no choque la carga
        await this.limpiarBaseDeDatos();
        // 2. Cargar usuarios
        const usuario = await this.cargarUsuarios();

        // 3. Cargar reclamos para cada usuario
        await this.cargarReclamos(usuario);

        return true;
    }

    async limpiarBaseDeDatos(): Promise<boolean> {
        // 1. Borrar reclamos : no pueden quedar reclamos sueltos
        await this.reclamosRepository.createQueryBuilder().delete().where({}).execute();
        // 2. Borrar usuarios
        await this.usuarioRepository .createQueryBuilder().delete().where({}).execute();

        return true;
    }

    async cargarUsuarios(): Promise<Usuario> {
        // 1. Crear usuarios
        const usuarios = [];

        for (const usuario of SEED_USUARIOS) {
            usuarios.push(await this.servicioUsuarios.create(usuario));
        }

        // Voy a devolver el primer usuario creado
        return usuarios[0];
    }
    
    async cargarReclamos(usuario: Usuario): Promise<void> {
        // 1. Crear reclamos
        const reclamos = [];

        for (const reclamo of SEED_RECLAMOS) {
            reclamos.push(this.servicioReclamos.create(reclamo ,usuario));
        }

        await Promise.all(reclamos);
    }
}
