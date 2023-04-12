import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { tituloArgsFilter } from './dto/args/tituloArgs';

import { Reclamo } from './entity/reclamo.entity';
import { CrearReclamoInput, ActualizarReclamoInput } from './dto/inputs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/users/entities/user.entity';

@Injectable()
export class ReclamosService {
    // Inyeccion del repositorio
    constructor(
        // decorador para conexion con nestJS
        @InjectRepository(Reclamo)
        private reclamosRepository: Repository<Reclamo>
    ) {}


    //Arreglo de reclamos ficticio, SIMIL base de datos
    // private reclamosRepository: Reclamo[] = [
    //     {
    //         id: "1",
    //         nroReclamo: 211,
    //         titulo: "Reclamo de prueba",
    //         detalleDeCompra: "Detalle de compra de prueba",
    //         problema:  "Problema de prueba"
    //     },
    //     {
    //         id: "2",
    //         nroReclamo: 212,
    //         titulo: "Reclamo de prueba 2",
    //         detalleDeCompra: "Detalle de compra de prueba 2",
    //         problema:  "Problema de prueba 2"
    //     },
    //     {
    //         id: "3",
    //         nroReclamo: 213,
    //         titulo: "Reclamo de prueba 3",
    //         detalleDeCompra: "Detalle de compra de prueba 3",
    //         problema:  "Problema de prueba 3"
    //     }
    // ]

    // Traer todos los reclamos de la base de datos, arreglo de reclamos
    // Filtro : si recibimos titulo especificado se aplica el filtro
    getAllReclamos(titulo? : tituloArgsFilter): Promise<Reclamo[]>{
        // TODO: /filtrar titulo /paginar
        const reclamosDB = this.reclamosRepository.find(); 

        //Si recibimos titulo, devuelvo el arreglo de reclamos cuyo titulo contenga la palabra
        if (titulo)
            return this.reclamosRepository.find({where: {titulo: titulo.palabraClave}});
            
            
        //Si no recibimos titulo, devuelvo el arreglo de reclamos
        return this.reclamosRepository.find();
    }

    // Traer reclamos filtrados por usuario propietario
    async getReclamosByUser(usuario: Usuario): Promise<Reclamo[]>{
        // Si el usuario no tiene reclamos, devuelvo un arreg1lo vacio
        const reclamos = await this.reclamosRepository.find(
            {where: {
                // el usuario condicion tiene que coincidir con el usuario que esta actuando
                usuario: {
                    //necesito que el usuario tenga el id para buscar los reclamos
                    id: usuario.id
                }
            }}
        );
        if (reclamos.length === 0)
            return [];
        else
            return reclamos;
    }

    async getReclamoByUser(id: string , usuario: Usuario): Promise<Reclamo> {
        const reclamo = await this.reclamosRepository.findOneBy({
            id,
            usuario: {
                id: usuario.id
            }
        });

        if (!reclamo)
            throw new NotFoundException(`Reclamo con ID ${id}, no encontrado en tu cuenta`);

        return reclamo;
    }

    async getReclamoById(id: string): Promise<Reclamo>{
        //Si el reclamo no existe, devuelvo null
        const reclamoSolicitado = await this.reclamosRepository.find({where: {id: id}});

        if (reclamoSolicitado.length === 0)
            throw new NotFoundException(`Reclamo con ID ${id}, no encontrado`);
        else {
            return reclamoSolicitado[0];
        }
    }

    // Crear un reclamo
    async create(crearReclamoInput: CrearReclamoInput, usuarioDelTicket: Usuario ): Promise<Reclamo>{
        // Creo formato de mi detalle de compra
        const detalleDeCompraCSV = crearReclamoInput.codigoProducto + "," + crearReclamoInput.marca + "," + crearReclamoInput.fechaCompra + "," + crearReclamoInput.numeroFactura; 

        // Intercepto el reclamo para dar forma a mi detalle de compra y lo guardo en la base de datos
        const nuevoReclamo = this.reclamosRepository.create({...crearReclamoInput, usuario: usuarioDelTicket, detalleDeCompra: detalleDeCompraCSV});
        // Persistencia de datos
        await this.reclamosRepository.save(nuevoReclamo);
        console.log(nuevoReclamo);
        return nuevoReclamo;
    }
    
    // Actualizar un reclamo por id
    async update(id: string, actualizarReclamoInput: ActualizarReclamoInput): Promise<Reclamo>{
        //"preload" si existe el reclamo con ese id lo actualiza y devuelve el reclamo actualizado
        // No pude con el preload
        //Buscamos el reclamo por id
        const reclamo = await this.getReclamoById(id);
        console.log(reclamo);

        //Actualizamos los datos del reclamo si llegan
        reclamo.titulo = actualizarReclamoInput.titulo ? actualizarReclamoInput.titulo : reclamo.titulo;
        // reclamo.detalleDeCompra = actualizarReclamoInput.detalleDeCompra ? actualizarReclamoInput.detalleDeCompra : reclamo.detalleDeCompra;
        reclamo.problema = actualizarReclamoInput.problema ? actualizarReclamoInput.problema : reclamo.problema;


        const reclamoActualizado = await this.reclamosRepository.save(reclamo);

        return reclamoActualizado;
    }

    // Borrar un reclamo por id permanente
    async delete(id: string): Promise<Reclamo> {
        // Busco el reclamo solicitado para eliminar
        const reclamoEliminado = await this.getReclamoById(id);
        let nroReclamo = reclamoEliminado.nroReclamo;

        // Elimino el reclamo
        console.log(await this.reclamosRepository.remove(reclamoEliminado));

        //Cargo nroReclamo y ID en el Reclamo eliminado
        reclamoEliminado.nroReclamo = nroReclamo;
        reclamoEliminado.id = id;
        // return {...reclamoEliminado, id};
        return reclamoEliminado; 
    }

    // Borrar un reclamo por id Logicamente
    async deleteLogicamente(id: string): Promise<Reclamo> {
        // Busco el reclamo solicitado para eliminar
        const reclamoEliminado = await this.getReclamoById(id);
        let nroReclamo = reclamoEliminado.nroReclamo;
        
        // Elimino el reclamo
        reclamoEliminado.activo = false;
        console.log(await this.reclamosRepository.save(reclamoEliminado));

        //Cargo nroReclamo y ID en el Reclamo eliminado
        reclamoEliminado.nroReclamo = nroReclamo;
        reclamoEliminado.id = id;
        return {...reclamoEliminado, id};
    }



    // Traer reclamos por palabra clave (Titulo, problema)
    async getReclamoPorPalabraClave(palabraClave: string): Promise<Reclamo[]>{

        // Guardo todos los reclamos en un arreglo
        const reclamos = await this.getAllReclamos();

        const reclamosToList: Reclamo[] = [];


        // Si la palabra clave esta vacia, devuelvo todos los reclamos
        if (!palabraClave || palabraClave === "")
            return this.getAllReclamos();

        //Limpio ambas cadenas de texto para compararlas
        // recorro todos los reclamos y preparo mi array de devolución
        reclamos.forEach(reclamo => {
            if (reclamo.titulo.toLowerCase().includes(palabraClave) || reclamo.problema.toLowerCase().includes(palabraClave))
                reclamosToList.push(reclamo);
        });

        if (reclamosToList.length === 0)
            throw new NotFoundException(`Reclamo con palabra clave ${palabraClave}, no encontrado`);
        else {
            return reclamosToList;
        }
     }




    // Traer una lista de reclamos filtrados por palabra clave. (titulo, Problema)
    getReclamosFiltrados(palabraClave: string): string{
        // return this.reclamosRepository.filter(reclamo => reclamo.titulo.includes(palabraClave) || reclamo.problema.includes(palabraClave));
        return "Devuelvo los reclamos que sigan cierta regla"
    }

}
