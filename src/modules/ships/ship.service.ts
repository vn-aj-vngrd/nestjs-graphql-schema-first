import { Injectable } from '@nestjs/common';
import { Ship } from '@prisma/client';
import { NewShip, UpdateShip } from 'src/graphql.schema';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ShipsService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string): Promise<Ship | null> {
    return this.prisma.ship.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll(): Promise<Ship[]> {
    return this.prisma.ship.findMany({});
  }

  async create(input: NewShip): Promise<Ship> {
    return this.prisma.ship.create({
      data: input,
    });
  }

  async update(params: UpdateShip): Promise<Ship> {
    const { id, ...params_without_id } = params;

    return this.prisma.ship.update({
      where: {
        id,
      },
      data: {
        ...params_without_id,
      },
    });
  }

  async delete(id: string): Promise<Ship> {
    return this.prisma.ship.delete({
      where: {
        id,
      },
    });
  }
}
