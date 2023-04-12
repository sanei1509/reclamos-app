import { Mutation, Resolver } from '@nestjs/graphql';
import { SeedService } from './seed.service';

@Resolver()
export class SeedResolver {
  constructor(private readonly seedService: SeedService) {}

  //Execution seed
  @Mutation( () => Boolean, { name: 'cargaDeDatos', description: 'Construye datos base para poder probar la aplicación' })
  async cargaDeDatos() : Promise<boolean> {
    return this.seedService.seed();
  }

}
