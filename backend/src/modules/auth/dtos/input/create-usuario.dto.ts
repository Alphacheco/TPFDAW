import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { EstadosUsuariosEnum } from "../../enums/estados-usuarios.enum";

export class CreateUsuarioDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre!: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    clave!: string;

    @ApiPropertyOptional({ enum: EstadosUsuariosEnum, default: EstadosUsuariosEnum.ACTIVO })
    @IsEnum(EstadosUsuariosEnum)
    @IsOptional()
    estado?: EstadosUsuariosEnum;
}
