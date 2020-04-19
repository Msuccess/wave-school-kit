import { LevelEntity } from './../../level/level.entity';
import { LevelService } from './../../level/level/level.service';
import { CreateSubjectDto } from './../dto/create-subject.dto';
import { ResultException } from './../../../config/result';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectRepository } from '../subject.repository';

@Injectable()
export class SubjectService {
  levels: LevelEntity[] = [];
  constructor(
    @InjectRepository(SubjectRepository)
    private subjectRepository: SubjectRepository,
    private levelService: LevelService,
  ) {}

  public async getSubjects() {
    try {
      return await this.subjectRepository.find();
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getSubject(id: string) {
    try {
      return await this.subjectRepository.findOne(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async addSubject(newSubject: CreateSubjectDto) {
    try {
      await this.pushLevels(newSubject.levelIds);

      newSubject.levels = this.levels;
      return await this.subjectRepository.save(newSubject);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateSubject(id: string, newSubject: CreateSubjectDto) {
    try {
      if (newSubject.levelIds.length != 0) {
        await this.pushLevels(newSubject.levelIds);
      }
      newSubject.levels = this.levels;
      delete newSubject.levelIds;

      return await this.subjectRepository.update(id, newSubject);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteSubject(id: string) {
    try {
      return await this.subjectRepository.delete(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  private async pushLevels(levelIds: string[]) {
    for (let index = 0; index < levelIds.length; index++) {
      const element = levelIds[index];
      const level = await this.getLevel(element);
      this.levels.push(level);
    }
  }

  private async getLevel(id: string) {
    return await this.levelService.getLevel(id);
  }
}
