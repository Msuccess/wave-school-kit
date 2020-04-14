import { CreateSubjectDto } from './../dto/create-subject.dto';
import { ResultException } from './../../../config/result';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectRepository } from '../subject.repository';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectRepository)
    private subjectRepository: SubjectRepository,
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
      return await this.subjectRepository.save(newSubject);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateSubject(id: string, newSubject: CreateSubjectDto) {
    try {
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
}
