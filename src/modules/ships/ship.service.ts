import { Injectable } from '@nestjs/common';
import { Prisma, Ship, User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { ShipCreateInput } from 'src/@generated/ship/ship-create.input';
import { ShipUpdateInput } from 'src/@generated/ship/ship-update.input';
import { formatOrderBy } from 'src/utils/format-orderBy';

import { OrderByParams } from '../../graphql.schema';

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

  async findAll(orderBy?: OrderByParams): Promise<ShipWithUser[]> {
    let orderByObj: Prisma.ShipOrderByWithRelationInput = {
      createdAt: 'desc',
    };

    if (orderBy) {
      orderByObj = formatOrderBy(orderBy.field, orderBy.direction);
    }

    return this.prisma.ship.findMany({
      orderBy: orderByObj,
      include: {
        userCreatedBy: true,
      },
    });
  }

  async create(input: ShipCreateInput): Promise<ShipWithUser> {
    const { userCreatedBy, ...input_without_user } = input;

    return this.prisma.ship.create({
      data: {
        ...input_without_user,
        userCreatedBy: {
          connect: {
            id: userCreatedBy.connect.id,
          },
        },
      },
      include: {
        userCreatedBy: true,
      },
    });
  }

  async update(params: ShipUpdateInput): Promise<ShipWithUser> {
    const { id, userCreatedBy, ...params_without_id_and_userCreatedBy } =
      params;

    return this.prisma.ship.update({
      where: {
        id: id as string,
      },
      data: {
        ...params_without_id_and_userCreatedBy,
        userCreatedBy: {
          connect: {
            id: userCreatedBy.connect.id,
          },
        },
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
