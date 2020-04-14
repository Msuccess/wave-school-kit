import { ResultException } from './../../../config/result';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GuardianRepository } from '../guardian.repository';
import { CreateGuardianDto } from '../dto/create-guardian.dto';

@Injectable()
export class GuardianService {
  constructor(
    @InjectRepository(GuardianRepository)
    private guardianRepository: GuardianRepository,
  ) {}

  public async getGuardians() {
    try {
      return await this.guardianRepository.find();
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getGuardianByStudentId(studentId: string) {
    //TODO: Implement
  }

  public async getGuardian(id: string) {
    try {
      return await this.guardianRepository.findOne(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async addGuardian(newGuardian: CreateGuardianDto) {
    try {
      return await this.guardianRepository.save(newGuardian);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateGuardian(id: string, newGuardian: CreateGuardianDto) {
    try {
      return await this.guardianRepository.update(id, newGuardian);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteGuardian(id: string) {
    try {
      return await this.guardianRepository.delete(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
