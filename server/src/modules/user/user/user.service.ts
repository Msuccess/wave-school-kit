import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../user.entity';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { ResultException } from '../../../config/result';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository,
  ) {}

  async getUserByUserName(username: any) {
    return await this.usersRepository.findOne({ username });
  }

  async getUserByEmail(email: any) {
    try {
      return await this.usersRepository.findOne({ email });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllUser(): Promise<UserEntity[]> {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserById(id: string): Promise<UserEntity> {
    try {
      return await this.usersRepository.findOne(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async createUser(userData: CreateUserDto) {
    try {
      return await this.usersRepository.save(userData);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updateUser(id: string, userData: CreateUserDto) {
    try {
      return await this.usersRepository.update(id, userData);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUser(id: string) {
    try {
      return await this.usersRepository.delete(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async setAvatar(userId: number, avatarUrl: string) {
    const newUserAvatar = new CreateUserDto();
    newUserAvatar.avatar = avatarUrl;
    this.usersRepository.update(userId, newUserAvatar);
  }
}
