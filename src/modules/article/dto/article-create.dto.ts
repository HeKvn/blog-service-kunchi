import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class ArticleCreateDTO {
  @ApiProperty({
    description: '文章标题',
    example: 'javascript进阶'
  })
  @IsNotEmpty({ message: '请输入文章标题' })
  readonly title: string

  @ApiProperty({
    description: '文章描述/简介/摘要',
    example: '本篇将带你学习JavaScript进阶知识'
  })
  @IsNotEmpty({ message: '请输入文章描述' })
  readonly description: string

  @ApiProperty({
    description: '文章内容',
    example: 'this指向，作用域...'
  })
  @IsNotEmpty({ message: '请输入文章内容' })
  readonly content: string

  /**
   * 标签 id
   * @example [1, 2]
   */
  @ApiProperty({ description: '文章标签' })
  readonly tags?: number[]

  @ApiProperty({ description: '文章封面' })
  readonly cover?: string
}