import {extend, Field ,ID,InputType, PartialType } from "@nestjs/graphql";
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Max, MaxLength, MinLength } from "class-validator";
import { CrearReclamoInput } from "./crear-reclamo-input";

@InputType()
export class ActualizarReclamoInput extends PartialType(CrearReclamoInput){
    // Que es lo que requiere tener el input para actualizar un reclamo?
    @Field(() => ID, {description: 'id del reclamo', nullable: false})
    @IsUUID()
    id: string;


    // @Field(() => String, {description: 'titulo del reclamo', nullable: true})
    // @IsString()
    // @MinLength(5)
    // @MaxLength(30)
    // @IsNotEmpty()
    // @IsOptional()
    // titulo?: string;

    // @Field(() => String, {description: 'detalle de compra del reclamo', nullable: true})
    // @IsString()
    // @MinLength(5)
    // @MaxLength(50)
    // @IsNotEmpty()
    // @IsOptional()
    // detalleDeCompra?: string;

    
    // @Field(() => String, {description: 'problema del reclamo', nullable: true})
    // @IsNotEmpty()
    // @IsString()
    // @MinLength(5)
    // @MaxLength(50)
    // @IsOptional()
    // problema?: string;
}