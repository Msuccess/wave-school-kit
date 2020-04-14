import { UserRole } from './../../user/user.entity';
import { IsNotEmpty, IsDateString, Length, IsEmail } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty({ message: 'Firstname cannot be null!' })
  public firstname: string;

  @IsNotEmpty({ message: 'Lastname cannot be null' })
  lastname: string;

  @IsNotEmpty({ message: 'Gender cannot be null' })
  gender: string;

  @IsDateString({ message: 'Must have type Date String' })
  birthdate: Date;

  @IsNotEmpty({ message: 'Term cannot be null' })
  term: string;

  avatar: string;

  religion: string;

  previous_school: string;

  levelId: string;

  special_needs: string;

  guardianId: string;

  @IsNotEmpty({ message: 'phonenumber cannot be null' })
  public phoneNumber: string;

  @IsNotEmpty({ message: 'username cannot be null' })
  username: string;

  @IsEmail()
  @IsNotEmpty({ message: 'phonenumber cannot be null' })
  public email: string;

  @Length(8)
  @IsNotEmpty({ message: 'password cannot be null' })
  public password: string;
}
