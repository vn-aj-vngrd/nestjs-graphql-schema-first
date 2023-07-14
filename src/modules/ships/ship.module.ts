import { Module } from '@nestjs/common';

import { ShipsResolvers } from './ship.resolvers';
import { ShipsService } from './ship.service';

@Module({
  providers: [ShipsResolvers, ShipsService],
  imports: [],
})
export class ShipsModule {}
