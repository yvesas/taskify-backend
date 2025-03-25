import { Injectable } from '@nestjs/common';
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
    return this.tasksRepository.findOne(id, userId);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string) {
    return this.tasksRepository.update(id, updateTaskDto, userId);
  }

  async remove(id: string, userId: string) {
    return this.tasksRepository.remove(id, userId);
  }
}
