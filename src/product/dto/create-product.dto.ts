import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

export class CreateProductDto {
    @ApiProperty()
    @IsString()
    productName: string

    @ApiProperty()
    @IsUUID()
    category: string
}
