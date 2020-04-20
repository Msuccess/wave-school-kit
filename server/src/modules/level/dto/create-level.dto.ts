import { SubjectEntity } from './../../subject/subject.entity';
import { IsNotEmpty } from 'class-validator';

export class CreateLevelDto {
  @IsNotEmpty({ message: 'Name cannot be null!' })
  public name: string;

  @IsNotEmpty({ message: 'Teacher cannot be null' })
  teacher: string;

  subjectIds: string[];

  subjects: SubjectEntity[];
}
