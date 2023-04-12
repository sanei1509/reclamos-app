import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CrearUsuarioInput {
  @Field( () => String, {nullable: false})
  @IsNotEmpty()
  username: string;

  @Field(() => String, {nullable: false})
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field(() => String, {nullable: false})
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
