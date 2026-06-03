import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateClienteDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    telefono!: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email!: string;

}