import { join } from 'path';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { ReclamosModule } from './reclamos/reclamos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    //ENV VAR para configurar la app
    ConfigModule.forRoot(
      // Por defecto busca el archivo .env en la raiz del proyecto
      // {envFilePath: '.env-otra-ruta'}
      ),
    // Enlace a la app con graphql
    // un solo for root en la app principal
    // luego serian forFeatures en los modulos independientes para agregar mas funcionalidades
    GraphQLModule.forRoot<ApolloDriverConfig>({
      //debug: true,
      //playground: true,
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [
        //plugin para poder relizar y visualizar nuestras consultas en el navegador
        ApolloServerPluginLandingPageLocalDefault()
      ]  
    }),
    // Credenciales de la base de datos para el typeORM
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT, // + para convertir a numero
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [],
      synchronize: true,
      autoLoadEntities: true, 
    }),


    // Modulos de la app
    ReclamosModule,
    UsersModule,
    AuthModule,
    SeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
