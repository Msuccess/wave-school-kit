import { IsNotEmpty } from 'class-validator';

export class CreateGuardianDto {
  @IsNotEmpty({ message: 'Firstname cannot be null!' })
  public firstname: string;

  @IsNotEmpty({ message: 'Gender cannot be null' })
  gender: string;

  @IsNotEmpty({ message: 'Relation  cannot be null' })
  relation: string;

  lastname: string;

  occuption: string;

  address: string;

  telephone: string;
}
