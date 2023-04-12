import { Module } from '@nestjs/common';
import { ReclamosResolver } from './reclamos.resolver';
import { ReclamosService } from './reclamos.service';

import { Reclamo } from './entity/reclamo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ReclamosResolver, ReclamosService],
  imports: [
    TypeOrmModule.forFeature([Reclamo])
  ],
  // Quiero tener acceso a la entidad desde el seedResolver / seedService
  exports: [ReclamosService, TypeOrmModule]
})
export class ReclamosModule {}
