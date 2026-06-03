import { ApiProperty } from "@nestjs/swagger";

export class ListUsuarioDTO {

    @ApiProperty()
    id!: number;

    @ApiProperty()
    nombre!: string;

    @ApiProperty()
    estado!: string;

}
