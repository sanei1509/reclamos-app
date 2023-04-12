import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsUUID, MinLength } from 'class-validator';
import { CrearUsuarioInput } from './create-user.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { RolesValidos } from 'src/auth/enums/roles-validos.enum';

@InputType()
export class ActualizarUsuarioInput extends PartialType(CrearUsuarioInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field(() => String, {nullable: true})
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string;

  @Field(() => String, {nullable: true})
  @IsOptional()
  @IsNotEmpty()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @Field(() => [String], {nullable: true})
  @IsOptional()
  @IsArray()
  roles?: RolesValidos[];

  @Field(() => Boolean, {nullable: true})
  @IsOptional()
  isActive?: boolean;
}
