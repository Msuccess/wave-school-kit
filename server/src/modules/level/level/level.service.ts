import { ResultException } from './../../../config/result';
import { LevelRepository } from './../level.repository';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLevelDto } from '../dto/create-level.dto';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(LevelRepository)
    private levelRepository: LevelRepository,
  ) {}

  public async getLevels() {
    try {
      return await this.levelRepository.find();
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getLevel(id: string) {
    try {
      return await this.levelRepository.findOne(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async addLevel(newLevel: CreateLevelDto) {
    try {
      return await this.levelRepository.save(newLevel);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateLevel(id: string, newLevel: CreateLevelDto) {
    try {
      return await this.levelRepository.update(id, newLevel);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteLevel(id: string) {
    try {
      return await this.levelRepository.delete(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
