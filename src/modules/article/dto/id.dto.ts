import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches } from "class-validator";
import { regPositive } from "src/utils/regex.util";

export class IdDTO {
  @ApiProperty({
    description: '文章id',
    example: 1
  })
  @Matches(regPositive, { message: '请输入有效id' })
  @IsNotEmpty({ message: 'id不能为空' })
  readonly id: number
}