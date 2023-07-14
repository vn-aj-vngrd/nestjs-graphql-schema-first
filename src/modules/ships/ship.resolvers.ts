import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { ShipCreateInput } from 'src/@generated/ship/ship-create.input';
import { ShipUpdateInput } from 'src/@generated/ship/ship-update.input';
import { Ship } from 'src/graphql.schema';

import { ShipsService } from './ship.service';

const pubSub = new PubSub();

@Resolver('Ship')
export class ShipsResolvers {
  constructor(private readonly shipService: ShipsService) {}

  @Query('ships')
  async ships(): Promise<Ship[]> {
    return this.shipService.findAll();
  }

  @Query('ship')
  async ship(@Args('id') args: string): Promise<Ship> {
    return this.shipService.findOne(args);
  }

  @Mutation('createShip')
  async create(@Args('input') args: ShipCreateInput): Promise<Ship> {
    const createdShip = await this.shipService.create(args);
    pubSub.publish('shipCreated', { shipCreated: createdShip });
    return createdShip;
  }

  @Mutation('updateShip')
  async update(@Args('input') args: ShipUpdateInput): Promise<Ship> {
    return this.shipService.update(args);
  }

  @Mutation('deleteShip')
  async delete(@Args('id') args: string): Promise<Ship> {
    return this.shipService.delete(args);
  }

  @Subscription('shipCreated')
  shipCreated() {
    return pubSub.asyncIterator('shipCreated');
  }
}
