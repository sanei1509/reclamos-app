import { RegistroUsuarioInput } from './registro.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

@InputType()
export class LoginUsuarioInput {
  // Que necesito del usuario obligatoriamente para loguearlo ?
  @Field( () => String, {nullable: true})
  @IsOptional()
  username?: string;

  @Field()
  @IsNotEmpty()
  email?: string;

  @Field(() => String, {nullable: false})
  @IsNotEmpty()
  password: string;
}
