import { ApiProperty } from "@nestjs/swagger";
import { IsEmail,  IsNotEmpty, IsString, } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({required: true})    
    @IsString()
    firstName: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    password: string;
}

export class loginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  password: string;
}

