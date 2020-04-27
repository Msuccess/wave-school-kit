import { IsNotEmpty, IsNumber } from 'class-validator';
import { StudentEntity } from './../../student/student.entity';
import { SubjectEntity } from './../../subject/subject.entity';

export class CreateResultDto {
  @IsNotEmpty({ message: 'Subject cannot be null!' })
  subjectId: string;

  student: StudentEntity;
  subject: SubjectEntity;

  @IsNotEmpty({ message: 'Student cannot be null!' })
  studentId: string;

  @IsNotEmpty({ message: 'Acadamic cannot be null!' })
  acadamic_year: string;

  @IsNotEmpty({ message: 'Level cannot be null!' })
  level: string;

  @IsNotEmpty({ message: 'Term cannot be null!' })
  term: string;

  @IsNotEmpty({ message: 'Score cannot be null!' })
  //   @IsNumber()
  score: number;
}
