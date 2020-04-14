import { IsNotEmpty, Length } from 'class-validator';

export class UserDto {
  @Length(8)
  @IsNotEmpty({ message: 'password cannot be null' })
  password: string;

  @IsNotEmpty()
  username: string;
}
