import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../model/user.entity';
import { UserDto } from '../dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    try {
      return this.userRepository.find();
    } catch (error) {
      throw new NotFoundException(`User not found: ${error}`);
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      return this.userRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async create(userDto: UserDto): Promise<User> {
    try {
      const user = this.userRepository.create(userDto.toEntity());
      return this.userRepository.save(user);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(id: number, userDto: UserDto): Promise<any> {
    try {
      const user = await this.userRepository.findOne({ where: { id: id } });
      this.userRepository.merge(user, userDto);
      return this.userRepository.save(user);
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  remove(id: string): Promise<any> {
    try {
      return this.userRepository.delete(id);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (error) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
  }
}
