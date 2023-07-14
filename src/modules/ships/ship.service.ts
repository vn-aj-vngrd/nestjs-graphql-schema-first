import { Injectable } from '@nestjs/common';
import { Ship, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { ShipUncheckedUpdateInput } from 'src/@generated/ship/ship-unchecked-update.input';
import { NewShip } from 'src/graphql.schema';

interface ShipWithUser extends Ship {
  userCreatedBy: User;
}

@Injectable()
export class ShipsService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string): Promise<ShipWithUser | null> {
    return this.prisma.ship.findUnique({
      where: {
        id,
      },
      include: {
        userCreatedBy: true,
      },
    });
  }

  async findAll(): Promise<ShipWithUser[]> {
    return this.prisma.ship.findMany({
      include: {
        userCreatedBy: true,
      },
    });
  }

  async create(input: NewShip): Promise<ShipWithUser> {
    return this.prisma.ship.create({
      data: input,
      include: {
        userCreatedBy: true,
      },
    });
  }

  async update(params: ShipUncheckedUpdateInput): Promise<ShipWithUser> {
    const { id, ...params_without_id } = params;

    return this.prisma.ship.update({
      where: {
        id: id as string,
      },
      data: {
        ...params_without_id,
      },
      include: {
        userCreatedBy: true,
      },
    });
  }

  async delete(id: string): Promise<ShipWithUser> {
    return this.prisma.ship.delete({
      where: {
        id,
      },
      include: {
        userCreatedBy: true,
      },
    });
  }
}
