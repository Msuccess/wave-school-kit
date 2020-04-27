import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherRepository } from '../teacher.repository';
import { ResultException } from '../../../config/result';
import { CreateTeacherDto } from '../dto/create-teacher.dto';
import { UserService } from '../../../modules/user/user/user.service';
import { AuthService } from '../../../auth/auth.service';
import { CreateUserDto } from '../../../modules/user/dto/create-user.dto';
import { UserRole } from '../../../modules/user/user.entity';
import { LevelService } from './../../level/level/level.service';
import { QueryModel } from './../../shared/model/query.model';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(TeacherRepository)
    private teacherRepository: TeacherRepository,
    private userService: UserService,
    private auth: AuthService,
    private levelService: LevelService,
  ) {}

  public async getTeachers(query: QueryModel) {
    try {
      return await this.teacherRepository.find({
        order: { createdAt: 'DESC' },
        take: query.pageSize,
        skip: query.pageSize * (query.page - 1),
      });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getTeacher(id: string) {
    try {
      return await this.teacherRepository.findOne(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async addTeacher(newTeacher: CreateTeacherDto) {
    const newUser = new CreateUserDto();
    newUser.password = newTeacher.password;
    newUser.email = newTeacher.email;
    newUser.phoneNumber = newTeacher.phonenumber;
    newUser.username = newTeacher.username;
    newUser.role = UserRole.TEACHER;

    try {
      newTeacher.user = await this.auth.signUp(newUser);
      newTeacher.level = await this.levelService.getLevel(newTeacher?.levelId);

      return await this.teacherRepository.saveTeacherEntity(newTeacher);
    } catch (error) {
      this.userService.deleteUser(newTeacher.user?.id);
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateTeacher(id: string, newTeacher: CreateTeacherDto) {
    try {
      return await this.teacherRepository.update(id, newTeacher);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteTeacher(id: string) {
    try {
      return await this.teacherRepository.delete(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getTeachersByIds(ids: string[]) {
    try {
      return await this.teacherRepository.findByIds(ids);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
