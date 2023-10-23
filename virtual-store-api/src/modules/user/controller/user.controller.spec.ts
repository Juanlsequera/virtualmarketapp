import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../service/user.service';
import { User } from '../model/user.entity';
import { UserDto } from '../dtos/user.dto';
import { AuthGuard } from '../../../guards/auth.guard';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: AuthGuard,
          useValue: {
            canActivate: jest.fn(() => true),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [];
      jest
        .spyOn(userService, 'findAll')
        .mockImplementation(() => Promise.resolve(result));

      expect(await userController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const result = new User();
      jest
        .spyOn(userService, 'findOne')
        .mockImplementation(() => Promise.resolve(result));

      expect(await userController.findOne(1)).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const userDto = new UserDto();
      const result = new User();
      jest
        .spyOn(userService, 'create')
        .mockImplementation(() => Promise.resolve(result));

      expect(await userController.create(userDto)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update an existing user', async () => {
      const userDto = new UserDto();
      const result = new User();
      jest
        .spyOn(userService, 'update')
        .mockImplementation(() => Promise.resolve(result));

      expect(await userController.update(1, userDto)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const result = new User();
      jest
        .spyOn(userService, 'remove')
        .mockImplementation(() => Promise.resolve(result));

      expect(await userController.remove('1')).toBe(result);
    });
  });
});
