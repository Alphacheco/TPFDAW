import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsIn } from "class-validator";

export class CreateProyectoDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre!: string;

    @ApiProperty()
    @IsString()
    @IsIn(['ACTIVO', 'FINALIZADO', 'BAJA'])
    estado!: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    idCliente!: number;

}