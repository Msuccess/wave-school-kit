import { LevelEntity } from './../../level/level.entity';
import { GuardianEntity } from './../../guardian/guardian.entity';
import { UserEntity } from './../../user/user.entity';
import { IsNotEmpty, Length, IsEmail } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty({ message: 'Firstname cannot be null!' })
  public firstname: string;

  @IsNotEmpty({ message: 'Lastname cannot be null' })
  lastname: string;

  @IsNotEmpty({ message: 'Gender cannot be null' })
  gender: string;

  // @IsDateString({ message: 'Birthdate Must have type Date String' })
  birthdate: string;

  @IsNotEmpty({ message: 'Term cannot be null' })
  term: string;

  avatar: string;

  religion: string;

  previous_school: string;

  special_needs: string;

  @IsNotEmpty({ message: 'Guardian cannot be null' })
  guardianId: string;

  user: UserEntity;
  guardian: GuardianEntity;

  @IsNotEmpty({ message: 'Level cannot be null' })
  levelId: string;

  level: LevelEntity;

  @IsNotEmpty({ message: 'phonenumber cannot be null' })
  public phonenumber: string;

  @IsNotEmpty({ message: 'username cannot be null' })
  username: string;

  @IsEmail()
  @IsNotEmpty({ message: 'phonenumber cannot be null' })
  public email: string;

  @Length(8)
  @IsNotEmpty({ message: 'password cannot be null' })
  public password: string;
}
