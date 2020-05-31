import { LevelService } from './../../level/level/level.service';
import { GuardianService } from './../../guardian/guardian/guardian.service';
import { UserService } from './../../user/user/user.service';
import { UserRole } from './../../user/user.entity';
import { CreateUserDto } from './../../user/dto/create-user.dto';
import { AuthService } from './../../../auth/auth.service';
import { ResultException } from './../../../config/result';
import { CreateStudentDto } from './../dto/create-student.dto';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentRepository } from '../student.repository';
import { QueryModel } from './../../shared/model/query.model';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentRepository)
    private studentRepository: StudentRepository,
    private userService: UserService,
    private auth: AuthService,
    private guardianService: GuardianService,
    private levelService: LevelService,
  ) {}

  public async getStudents(query: QueryModel) {
    try {
      return await this.studentRepository.find({
        take: query.pageSize,
        skip: query.pageSize * (query.page - 1),
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getStudent(id: string) {
    try {
      return await this.studentRepository.findOne(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getStudentsWithLevel(level: string) {
    try {
      return await this.studentRepository.getStudentsByLevel(level);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async addStudent(newStudent: CreateStudentDto) {
    // generate new ID
    const generatedStudentId = Math.floor(
      Math.random() * (999999999 - 100000000) + 100000000,
    ).toString();

    // TODO: Add Index Number Algor.
    const newUser = new CreateUserDto();
    newUser.password = newStudent.password;
    newUser.email = newStudent.email;
    newUser.phoneNumber = newStudent.phoneNumber;
    newUser.username = newStudent.username;
    newUser.role = UserRole.STUDENT;
    newUser.avatar = newStudent.avatar;

    try {
      const user = this.auth.signUp(newUser);
      newStudent.user = await user;

      newStudent.guardian = await this.guardianService.getGuardian(
        newStudent.guardianId,
      );

      newStudent.level = await this.levelService.getLevel(newStudent.levelId);

      newStudent.studentId = generatedStudentId;

      return await this.studentRepository.saveStudentEntity(newStudent);
    } catch (error) {
      this.userService.deleteUser(newStudent.user?.id);
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateStudent(id: string, newStudent: CreateStudentDto) {
    try {
      if (newStudent.guardianId) {
        newStudent.guardian = await this.guardianService.getGuardian(
          newStudent.guardianId,
        );
        delete newStudent.guardianId;
      }

      if (newStudent.levelId) {
        newStudent.level = await this.levelService.getLevel(newStudent.levelId);
        delete newStudent.levelId;
      }

      return await this.studentRepository.update(id, newStudent);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteStudent(id: string) {
    try {
      return await this.studentRepository.delete(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
