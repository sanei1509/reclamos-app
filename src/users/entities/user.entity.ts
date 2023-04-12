import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { IsEmail, IsUUID } from 'class-validator';
import { RolesValidos } from 'src/auth/enums/roles-validos.enum';
import { Reclamo } from 'src/reclamos/entity/reclamo.entity';
import { Column, Entity, Index, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity("usuarios")
@ObjectType()
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  @IsUUID()
  id: string;

  // username
  @Field(() => String)
  @Column({unique: true})
  username: string;

  // email
  @Field(() => String)
  @Column({unique: true})
  @IsEmail()
  email: string;

  // password
  // @Field(() => String) // no se debe devolver el password
  @Column()
  password: string;

  // roles // USER, ADMIN , arreglo de strings
  @Field(() => [String])
  @Column({
    type: 'text',
    array: true,
    default: ["USER"]
  })
  roles: RolesValidos[];

  // estado // ACTIVE
  @Field(() => String)
  @Column({
    type: 'boolean',
    default: true
  })
  active: boolean;


  // Ultima modificacion de roles
  @Field(() => Usuario, {nullable: true})
  @JoinColumn({name: 'ultima_modificacion'})
  @Index('userId-index')
  @ManyToOne(() => Usuario, (usuario) => usuario.ultimaModificacion, {nullable: true, lazy: true})
  ultimaModificacion?: Usuario;


  // relacion con sus tickets de reclamos
  @Field(() => [Reclamo])
  @OneToMany(() => Reclamo, (reclamo) => reclamo.usuario)
  reclamos: Reclamo[];
  
}
