import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { ShipsService } from './ship.service';
import { Ship, NewShip, UpdateShip } from 'src/graphql.schema';
import { PubSub } from 'graphql-subscriptions';

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
  async create(@Args('input') args: NewShip): Promise<Ship> {
    const createdShip = await this.shipService.create(args);
    pubSub.publish('shipCreated', { shipCreated: createdShip });
    return createdShip;
  }

  @Mutation('updateShip')
  async update(@Args('input') args: UpdateShip): Promise<Ship> {
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
