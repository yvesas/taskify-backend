import { Injectable } from '@nestjs/common';
import { PrismaProvider } from '../db/prisma.provider';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksRepository {
  constructor(private prisma: PrismaProvider) {}

  async create(createTaskDto: CreateTaskDto, userId: string) {
    return this.prisma.task.create({
      data: { ...createTaskDto, userId },
    });
  }

  async findAll(userId: string) {
    return this.prisma.task.findMany({ where: { userId } });
  }

  async findOne(id: string, userId: string) {
    return this.prisma.task.findUnique({ where: { id, userId } });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string) {
    return this.prisma.task.update({
      where: { id, userId },
      data: updateTaskDto,
    });
  }

  async remove(id: string, userId: string) {
    return this.prisma.task.delete({ where: { id, userId } });
  }
}
