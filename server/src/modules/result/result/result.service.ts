import { ResultRepository } from './../result.repository';
import { ResultException } from './../../../config/result';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateResultDto } from '../dto/create-result.dto';
import { SubjectService } from './../../subject/subject/subject.service';
import { StudentService } from './../../student/student/student.service';
import { QueryModel } from './../../shared/model/query.model';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(ResultRepository)
    private resultRepository: ResultRepository,
    private subjectService: SubjectService,
    private studentService: StudentService,
  ) {}

  public async getResults(query: QueryModel) {
    try {
      return await this.resultRepository.find({
        take: query.pageSize,
        skip: query.pageSize * (query.page - 1),
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getResult(id: string) {
    try {
      return await this.resultRepository.findOne(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async addResult(newResult: CreateResultDto) {
    try {
      newResult.student = await this.studentService.getStudent(
        newResult.studentId,
      );

      newResult.subject = await this.subjectService.getSubject(
        newResult.subjectId,
      );

      return await this.resultRepository.save(newResult);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateResult(id: string, newResult: CreateResultDto) {
    try {
      newResult.studentId
        ? (newResult.student = await this.studentService.getStudent(
            newResult.studentId,
          ))
        : '';

      newResult.subjectId
        ? (newResult.subject = await this.subjectService.getSubject(
            newResult.subjectId,
          ))
        : '';

      this.deleteProperty(newResult);

      return await this.resultRepository.update(id, newResult);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteResult(id: string) {
    try {
      return await this.resultRepository.delete(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // public async getResultByUserId(studentId: string) {
  //   // TODO:Get student results
  // }
  private deleteProperty(value: CreateResultDto) {
    delete value.studentId;
  }
}
