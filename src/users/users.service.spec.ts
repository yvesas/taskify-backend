import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { NotFoundException } from '@nestjs/common';
import 'jest';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: UsersRepository;

  const mockUsersRepository = () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useFactory: mockUsersRepository },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto = { email: 'test@example.com', password: 'password' };
      await usersService.create(createUserDto);
      expect(usersRepository.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      await usersService.findAll();
      expect(usersRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const userId = 'user-id';
      await usersService.findOne(userId);
      expect(usersRepository.findOne).toHaveBeenCalledWith(userId);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      const userId = 'user-id';
      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(null);
      await expect(usersService.findOne(userId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const userId = 'user-id';
      const updateUserDto = {
        email: 'updated@example.com',
        password: 'updated-password',
      };
      await usersService.update(userId, updateUserDto);
      expect(usersRepository.update).toHaveBeenCalledWith(
        userId,
        updateUserDto,
      );
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const userId = 'user-id';
      await usersService.remove(userId);
      expect(usersRepository.remove).toHaveBeenCalledWith(userId);
    });
  });
});
