import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

@InputType() // Le decimos a GRAPHQL que tipo de datos vamos a recibir y VALIDAMOS
export class CrearReclamoInput{
    @Field(() => String, {description: 'titulo del reclamo', nullable: false})
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    @MinLength(5)
    titulo: string;

    // @Field(() => String, {description: 'detalle de compra del reclamo', nullable: false})
    // @IsNotEmpty()
    // @IsString()
    // @MaxLength(50)
    // @MinLength(5)
    // detalleDeCompra: string;
    
    // Voy a separar el detalle de compra en 4 campos

    //numero de la factura
    @Field(() => String, {description: 'marca del producto', nullable: false})
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    @MinLength(1)
    marca: string;

    
    @Field(() => String, {description: 'numero de la factura', nullable: false})
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    @MinLength(5)
    numeroFactura: string;

    //codigo del producto
    @Field(() => String, {description: 'codigo del producto', nullable: false})
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    @MinLength(2)
    codigoProducto: string;

    @Field(() => String, {description: 'fecha de compra del producto', nullable: false})
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    @MinLength(5)
    fechaCompra: string;


    @Field(() => String, {description: 'problema del reclamo', nullable: false})
    @IsNotEmpty()
    @IsString()
    @MaxLength(70)
    @MinLength(5)
    problema: string;

}