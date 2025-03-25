import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  async create(createTaskDto: CreateTaskDto, userId: string) {
    return this.tasksRepository.create(createTaskDto, userId);
  }

  async findAll(userId: string) {
    return this.tasksRepository.findAll(userId);
  }

  async findOne(id: string, userId: string) {
    const task = await this.tasksRepository.findOne(id, userId);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string) {
    return this.tasksRepository.update(id, updateTaskDto, userId);
  }

  async remove(id: string, userId: string) {
    return this.tasksRepository.remove(id, userId);
  }
}
