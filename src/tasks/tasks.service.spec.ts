import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';
import { NotFoundException } from '@nestjs/common';
import 'jest';
import { TaskStatus } from './task.interface';
describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository: TasksRepository;

  const mockTasksRepository = () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    tasksRepository = module.get<TasksRepository>(TasksRepository);
  });

  it('should be defined', () => {
    expect(tasksService).toBeDefined();
  });

  describe('create', () => {
    it('should create a task', async () => {
      const createTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
        status: TaskStatus.PENDING,
      };
      const userId = 'user-id';
      await tasksService.create(createTaskDto, userId);
      expect(tasksRepository.create).toHaveBeenCalledWith(
        createTaskDto,
        userId,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const userId = 'user-id';
      await tasksService.findAll(userId);
      expect(tasksRepository.findAll).toHaveBeenCalledWith(userId);
    });
  });

  describe('findOne', () => {
    it('should return a task', async () => {
      const taskId = 'task-id';
      const userId = 'user-id';
      await tasksService.findOne(taskId, userId);
      expect(tasksRepository.findOne).toHaveBeenCalledWith(taskId, userId);
    });

    it('should throw NotFoundException if task does not exist', async () => {
      const taskId = 'task-id';
      const userId = 'user-id';
      jest.spyOn(tasksRepository, 'findOne').mockResolvedValue(null);
      await expect(tasksService.findOne(taskId, userId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const taskId = 'task-id';
      const updateTaskDto = {
        title: 'Updated Task',
        status: TaskStatus.COMPLETED,
      };
      const userId = 'user-id';
      await tasksService.update(taskId, updateTaskDto, userId);
      expect(tasksRepository.update).toHaveBeenCalledWith(
        taskId,
        updateTaskDto,
        userId,
      );
    });
  });

  describe('remove', () => {
    it('should remove a task', async () => {
      const taskId = 'task-id';
      const userId = 'user-id';
      await tasksService.remove(taskId, userId);
      expect(tasksRepository.remove).toHaveBeenCalledWith(taskId, userId);
    });
  });
});
