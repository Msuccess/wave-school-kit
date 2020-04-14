import { UserRole } from './../../user/user.entity';
import { Roles } from 'src/auth/roles.decorator';
import { CreateUserDto } from './../../user/dto/create-user.dto';
import { UserDto } from './../../user/dto/user.dto';
import { AuthService } from './../../../auth/auth.service';
import { ResultException } from './../../../config/result';
import { CreateStudentDto } from './../dto/create-student.dto';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentRepository } from '../student.repository';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentRepository)
    private studentRepository: StudentRepository,
    private auth: AuthService,
  ) {}

  public async getStudents() {
    try {
      return await this.studentRepository.find();
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
    // TODO: Add Index Number Algor.

    try {
      const newUser = new CreateUserDto();
      newUser.password = newStudent.password;
      newUser.email = newStudent.email;
      newUser.phoneNumber = newStudent.phoneNumber;
      newUser.username = newStudent.username;
      newUser.role = UserRole.STUDENT;
      this.auth.signUp(newUser);

      return await this.studentRepository.save(newStudent);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateStudent(id: string, newStudent: CreateStudentDto) {
    try {
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
