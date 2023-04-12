import { ExecutionContext, ForbiddenException, InternalServerErrorException, createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { RolesValidos } from "../enums/roles-validos.enum";
import { Usuario } from "src/users/entities/user.entity";

export const CurrentUser =  createParamDecorator(
   (roles: RolesValidos[] = [], context: ExecutionContext) => {
    console.log(roles);
    // 1- obtengo el contexto
    // 2- del contexto obtengo la solicitud
    // 3- de la solicitud obtengo el usuario
    // Error handler ()
    // 4- devuelvo el usuario
    const ctx = GqlExecutionContext.create(context);
    const user: Usuario = ctx.getContext().req.user;

    if (!user) {
        throw new InternalServerErrorException("Ningun usuario encontrado en la solicitud - asegurate de que estas usando el AuthGuard (current user decorator problem)");
    }

    if (roles.length === 0) return user;

    // Si el usuario tiene alguno de los roles que le pasamos por parametro
    for (const role of roles){
        if (user.roles.includes(role)) return user;
    }
    //Devuelvo mensaje especial
    throw new ForbiddenException(`El usuario asociado al correo ${user.email} no tiene permisos para acceder a este recurso, contacta con el administrador`);
    }
) 