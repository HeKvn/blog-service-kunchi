import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, Matches } from "class-validator"
import { regPositive } from "src/utils/regex.util"

export class ListDTO {
  @ApiProperty({
    description: '页码',
    example: 1,
    required: false
  })
  @IsOptional() // 如果输入的等于null或者undefined，忽略其它的校验装饰器
  @Matches(regPositive, { message: 'page不可小于0' })
  readonly page: number

  @ApiProperty({
    description: '每页数据条数',
    example: 10,
    required: false
  })
  @IsOptional()
  @Matches(regPositive, { message: 'pageSize不可小于0' })
  readonly pageSize: number

  @IsOptional()
  @Matches(regPositive, { message: 'tagId应为数字' })
  readonly tagId?: number
}