import { SubjectEntity } from './../../subject/subject.entity';
import { SubjectService } from './../../subject/subject/subject.service';
import { ResultException } from './../../../config/result';
import { LevelRepository } from './../level.repository';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLevelDto } from '../dto/create-level.dto';

@Injectable()
export class LevelService {
  subjects: SubjectEntity[] = [];
  constructor(
    @InjectRepository(LevelRepository)
    private levelRepository: LevelRepository,
    private subjectService: SubjectService,
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
      await this.pushLevels(newLevel.subjectIds);

      newLevel.subjects = this.subjects;
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

  private async pushLevels(subjectIds: string[]) {
    for (let index = 0; index < subjectIds.length; index++) {
      const element = subjectIds[index];
      const subject = await this.getSubject(element);
      this.subjects.push(subject);
    }
  }

  private async getSubject(id: string) {
    return await this.subjectService.getSubject(id);
  }
}
