import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';
import { ConfigModule } from '@nestjs/config';
import { ReclamosModule } from 'src/reclamos/reclamos.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [SeedResolver, SeedService],
  // Para que el configModule sea accesible desde el seedResolver / seedService
  imports: [ConfigModule, ReclamosModule, UsersModule],
})
export class SeedModule {}
