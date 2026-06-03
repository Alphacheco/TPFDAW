import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { CreateUsuarioDto } from "./create-usuario.dto";
import { EstadosUsuariosEnum } from "../../enums/estados-usuarios.enum";

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {

    @ApiProperty({ enum: EstadosUsuariosEnum, example: EstadosUsuariosEnum.ACTIVO })
    @IsEnum(EstadosUsuariosEnum)
    @IsOptional()
    estado!: EstadosUsuariosEnum;

}
