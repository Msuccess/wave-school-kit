import { IsNotEmpty, IsEmail, Length } from 'class-validator';
import { UserEntity } from '../../../modules/user/user.entity';
import { LevelEntity } from '../../../modules/level/level.entity';

export class CreateTeacherDto {
  user: UserEntity;

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
