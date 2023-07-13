import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User, NewUser, UpdateUser } from 'src/graphql.schema';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver('User')
export class UsersResolvers {
  constructor(private readonly userService: UsersService) {}

  @Query('users')
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query('user')
  async user(@Args('id') args: string): Promise<User> {
    return this.userService.findOne(args);
  }

  @Mutation('createUser')
  async create(@Args('input') args: NewUser): Promise<User> {
    const createdUser = await this.userService.create(args);
    pubSub.publish('userCreated', { userCreated: createdUser });
    return createdUser;
  }

  @Mutation('updateUser')
  async update(@Args('input') args: UpdateUser): Promise<User> {
    return this.userService.update(args);
  }

  @Mutation('deleteUser')
  async delete(@Args('id') args: string): Promise<User> {
    return this.userService.delete(args);
  }

  @Subscription('userCreated')
  userCreated() {
    return pubSub.asyncIterator('userCreated');
  }
}
