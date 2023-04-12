import { Field, ObjectType } from "@nestjs/graphql";
import { Usuario } from "src/users/entities/user.entity";

@ObjectType()
export class AuthResponse {
    //vamos a tener el token y el usuario
    @Field(() => String, {nullable: false} )
    token: string;

    @Field(() => Usuario, {nullable: false})
    usuario: Usuario
}