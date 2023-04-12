import { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";


export class JwtAuthGuard extends AuthGuard('jwt'){
    getRequest(context: ExecutionContext){
        const ctx = GqlExecutionContext.create(context);
        const respuesta = ctx.getContext().req;
        return respuesta;
    }
}