import {Field, ArgsType } from "@nestjs/graphql";
import { IsOptional } from "class-validator";

// Descripcion de su funcionamiento: Este DTO se utiliza para filtrar los reclamos por titulo
@ArgsType()
export class tituloArgsFilter{
    //Validaciones
    @Field(() => String, {description: 'titulo del reclamo', nullable: true})
    @IsOptional()
    palabraClave: string;

}