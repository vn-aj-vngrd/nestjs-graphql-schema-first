/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class NewShip {
  name: string;
  type: string;
  createdById: string;
}

export class UpdateShip {
  id: string;
  name?: Nullable<string>;
  type?: Nullable<string>;
}

export class NewUser {
  username: string;
  name: string;
  password: string;
}

export class UpdateUser {
  id: string;
  username?: Nullable<string>;
  name?: Nullable<string>;
  password?: Nullable<string>;
}

export class Ship {
  id: string;
  name: string;
  type: string;
  createdById: string;
}

export abstract class IQuery {
  abstract ships(): Ship[] | Promise<Ship[]>;

  abstract ship(id: string): Nullable<Ship> | Promise<Nullable<Ship>>;

  abstract users(): User[] | Promise<User[]>;

  abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
  abstract createShip(input: NewShip): Ship | Promise<Ship>;

  abstract updateShip(
    input: UpdateShip,
  ): Nullable<Ship> | Promise<Nullable<Ship>>;

  abstract deleteShip(id: string): Nullable<Ship> | Promise<Nullable<Ship>>;

  abstract createUser(input: NewUser): User | Promise<User>;

  abstract updateUser(
    input: UpdateUser,
  ): Nullable<User> | Promise<Nullable<User>>;

  abstract deleteUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class ISubscription {
  abstract shipCreated(): Nullable<Ship> | Promise<Nullable<Ship>>;

  abstract userCreated(): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
  id: string;
  username: string;
  name: string;
  password: string;
}

type Nullable<T> = T | null;
