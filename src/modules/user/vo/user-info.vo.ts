import { ApiProperty } from "@nestjs/swagger";

export class UserInfoItem {
  @ApiProperty({
    description: '用户id',
    example: 1
  })
  id: number

  @ApiProperty({
    description: '创建时间',
    example: '2022-03-29'
  })
  createTime: Date

  @ApiProperty({
    description: '更新时间',
    example: '2022-03-29'
  })
  updateTime: Date

  @ApiProperty({
    description: '手机号',
    example: '13232198312'
  })
  mobile: string;
}

export class UserInfoVO {
  @ApiProperty({ type: UserInfoItem })
  info: UserInfoItem
}

export class UserInfoResponse {
  @ApiProperty({
    description: '状态码',
    example: 200
  })
  code: number

  @ApiProperty({
    description: '数据',
    type: () => UserInfoVO,
    example: UserInfoVO
  })
  data: UserInfoVO

  @ApiProperty({
    description: '请求结果信息',
    example: '请求成功'
  })
  message: string
}