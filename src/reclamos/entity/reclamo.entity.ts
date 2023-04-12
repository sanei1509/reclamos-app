import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { IsPositive } from "class-validator";
import { Usuario } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


//Que es un objectType()?
//https://docs.nestjs.com/graphql/resolvers#object-types
//ObjectType es parte del SDL de GraphQL

@Entity({name: 'reclamos'})
@ObjectType()
export class Reclamo {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    //El numero de reclamo es unico y debe auto generarse
    @PrimaryGeneratedColumn("increment")
    @IsPositive()
    @Field(() => Int)
    nroReclamo: number;

    @Field(() => String)
    @Column()
    titulo: string;

    // @Field(() => Object)
    // detalleDeCompra: {
    //     formatoCSV: string;
    //     nroFactura: number;
    //     fechaDeCompra: Date;
    //     codigoDeProducto: string;
    // };
    
    @Field(() => String)
    @Column()
    detalleDeCompra: string;

    @Field(() => String)
    @Column()
    problema: string;

    // Baja logica
    @Field(() => Boolean)
    @Column({default: true})
    activo: boolean;

    // Relacion con los usuarios
    @Field( () => Usuario )
    @ManyToOne( () => Usuario /* tipo con el que se relaciona*/, (usuario) => usuario.reclamos /*De que manera se va a relacionar*/, {nullable: false, eager: true})
    usuario: Usuario;

    //relacion al producto
    // @Field(() => Producto)
    // producto: Producto;
}