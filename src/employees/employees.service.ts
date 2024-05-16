import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { Role } from 'types/users';

@Injectable()
export class EmployeesService {


  constructor(private readonly databaseService: DatabaseService) { }

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    if (!["ADMIN", "INTERN", "ENGINEER"].includes(createEmployeeDto.role)) {
      throw new NotFoundException('Role is not correct');
    }
    return this.databaseService.employee.create({
      data: createEmployeeDto
    });
  }

  async findAll(role?: Role) {

    if (role) {
      return this.databaseService.employee.findMany({
        where: {
          role,
        }
      });
    }
    return this.databaseService.employee.findMany();

  }

  async findOne(id: number) {
    return this.databaseService.employee.findUnique({
      where: {
        id
      }
    });
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.databaseService.employee.update({
      where: {
        id
      },
      data: updateEmployeeDto
    });
  }

  async remove(id: number) {
    return this.databaseService.employee.delete({
      where: {
        id
      },
    });
  }


}
