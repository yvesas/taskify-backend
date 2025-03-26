import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersRepository } from '../users/users.repository';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import 'jest';

describe('AuthService', () => {
  let authService: AuthService;
  let usersRepository: UsersRepository;
  let jwtService: JwtService;

  const mockUsersRepository = () => ({
    create: jest.fn(),
    findByEmail: jest.fn(),
  });

  const mockJwtService = () => ({
    sign: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersRepository, useFactory: mockUsersRepository },
        { provide: JwtService, useFactory: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signup', () => {
    it('should create a user and return a token', async () => {
      const authDto = { email: 'test@example.com', password: 'password' };
      const hashedPassword = 'hashed-password';
      const user = {
        id: 'user-id',
        email: authDto.email,
        password: hashedPassword,
      };
      const token = { access_token: 'access-token' };

      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);
      jest.spyOn(usersRepository, 'create').mockResolvedValue(user);
      jest.spyOn(jwtService, 'sign').mockReturnValue(token.access_token);

      const result = await authService.signup(authDto);

      expect(usersRepository.create).toHaveBeenCalledWith({
        email: authDto.email,
        password: hashedPassword,
      });
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: user.id,
        email: user.email,
      });
      expect(result).toEqual(token);
    });
  });

  describe('signin', () => {
    it('should return a token if credentials are valid', async () => {
      const authDto = { email: 'test@example.com', password: 'password' };
      const hashedPassword = 'hashed-password';
      const user = {
        id: 'user-id',
        email: authDto.email,
        password: hashedPassword,
      };
      const token = { access_token: 'access-token' };

      jest.spyOn(usersRepository, 'findByEmail').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      jest.spyOn(jwtService, 'sign').mockReturnValue(token.access_token);

      const result = await authService.signin(authDto);

      expect(usersRepository.findByEmail).toHaveBeenCalledWith(authDto.email);
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: user.id,
        email: user.email,
      });
      expect(result).toEqual(token);
    });

    it('should throw UnauthorizedException if credentials are invalid', async () => {
      const authDto = {
        email: 'test@example.com',
        password: 'invalid-password',
      };
      const hashedPassword = 'hashed-password';
      const user = {
        id: 'user-id',
        email: authDto.email,
        password: hashedPassword,
      };

      jest.spyOn(usersRepository, 'findByEmail').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      await expect(authService.signin(authDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
