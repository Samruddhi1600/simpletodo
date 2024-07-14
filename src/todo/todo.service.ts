import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client';
import { UserEmail } from '../common/decorators/user-email.decorators';

@Injectable()
export class TodoService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createTodoDto: CreateTodoDto, userEmail: string) {
    try {
      const user = await this.databaseService.user.findUnique({
        where: { email: userEmail},
      });
      if (!user) {
        throw new Error('User not found');
      }

      const data: Prisma.TodoCreateInput = {
        description: createTodoDto.description,
        task: createTodoDto.task,
        status: 'ACTIVE',

        user: {
          connect: { email: userEmail },
        },
      }
      console.log(data);
      return await this.databaseService.todo.create({ data });
    } catch (err) {
      return err;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findAll(userEmail: string) {
    return this.databaseService.todo.findMany({
      where: {
        userEmail: userEmail,
      },
    });
  }

  async findOne(id: number) {
    return this.databaseService.todo.findFirst({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    return this.databaseService.todo.update({
      where: { id: id },
      data: updateTodoDto,
    });
  }

  remove(id: number) {
    return this.databaseService.todo.delete({
      where: {
        id: id,
      },
    });
  }
}
