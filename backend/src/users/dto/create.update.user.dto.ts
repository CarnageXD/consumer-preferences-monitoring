import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@users/entities/user.entity';
import { MinLength, MaxLength, IsEmail } from 'class-validator';

export class CreateOrUpdateUserDto {
  @ApiProperty({ required: true })
  @MaxLength(48)
  firstName: string;

  @ApiProperty({ required: true })
  @MaxLength(48)
  lastName: string;

  @ApiProperty({ required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @MinLength(8)
  password: string;

  @ApiProperty()
  role: UserRole;
}
