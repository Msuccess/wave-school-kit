import { LevelEntity } from './../../level/level.entity';
import { IsNotEmpty } from 'class-validator';

export class CreateSubjectDto {
  @IsNotEmpty({ message: 'Name cannot be null!' })
  public name: string;

  @IsNotEmpty({ message: 'Subject Code cannot be null' })
  subjectCode: string;

  levelIds: string[];

  levels: LevelEntity[];
}
