import { IsNotEmpty, IsEmail, Length } from 'class-validator';
import { UserRole } from '../user.entity';

export class CreateUserDto {
  id: string;
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

  public role: UserRole;
}
