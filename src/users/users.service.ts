import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from 'types/users';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { notFoundError } from 'utils/Errors/NotFoundError';

@Injectable()


export class UsersService {
  private users = [
    {
      "id": 1,
      "name": "Leanne Graham",
      "email": "Sincere@april.biz",
      "role": "INTERN"
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "email": "Shanna@melissa.tv",
      "role": "INTERN"
    },
    {
      "id": 3,
      "name": "Clemente Baunch",
      "email": "Clemente@Baunch.tv",
      "role": "INTERN"
    },
    {
      "id": 4,
      "name": "Clemente Baunch",
      "email": "Clemente@Baunch.tv",
      "role": "ENGINEER"
    },
    {
      "id": 5,
      "name": "Clemente Baunch",
      "email": "Clemente@Baunch.tv",
      "role": "ADMIN"
    },

  ];

  constructor() {
  }


  findAll(role?: Role) {
    if (!["ADMIN", "ENGINEER", "INTERN"].includes(role)) {
      notFoundError('wrong role');
    }

    if (role) {
      return this.users.filter((user) => user.role === role);
    }

    return this.users;
  }

  findOne(id?: number) {

    const user = this.users.find((user) => +user.id === +id);
    console.log(user);
    if (!user) {
      throw new NotFoundException('No user found');
    }

    return user;
  }

  create(user: CreateUserDto) {
    const usersByHighestId = +this.users.at(-1).id + 1;
    const newUser = { ...user, id: +usersByHighestId };
    this.users.push(newUser);
    return newUser;

  }

  update(id: number, userUpdate?: UpdateUserDto) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    const user = this.users[userIndex];
    this.users[userIndex] = { ...user, ...userUpdate };

    return this.findOne(id);
  }

  delete(id: number) {

    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}

