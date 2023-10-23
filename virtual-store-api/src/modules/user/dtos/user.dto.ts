import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';
import { User } from '../model/user.entity';

export class UserDto {
  @IsString()
  @MinLength(1, { message: 'The name cannot be empty' })
  readonly name: string;

  @IsEmail({}, { message: 'The email is not valid' })
  readonly email: string;

  @IsString()
  @MinLength(6, { message: 'The password must have at least 6 characters' })
  @IsOptional()
  readonly password: string;

  @IsString()
  @MinLength(4)
  @IsOptional()
  readonly role: string;

  toEntity(): User {
    const user = new User();
    user.name = this.name;
    user.email = this.email;
    user.password = this.password;
    user.role = this.role;
    return user;
  }
}
