import { ResultRepository } from './../result.repository';
import { ResultException } from './../../../config/result';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateResultDto } from '../dto/create-result.dto';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(ResultRepository)
    private resultRepository: ResultRepository,
  ) {}

  public async getResults() {
    try {
      return await this.resultRepository.find();
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
      return await this.resultRepository.save(newResult);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateResult(id: string, newResult: CreateResultDto) {
    try {
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

  public async getResultByUserId(studentId: string) {
    // TODO:Get student results
  }
}
