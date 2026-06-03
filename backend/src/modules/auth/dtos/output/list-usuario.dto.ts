import { ApiProperty } from "@nestjs/swagger";
import { EstadosUsuariosEnum } from "../../enums/estados-usuarios.enum";

export class ListUsuarioDto {

    @ApiProperty()
    id!: number;

    @ApiProperty()
    nombre!: string;

    @ApiProperty({ enum: EstadosUsuariosEnum })
    estado!: EstadosUsuariosEnum;
}
