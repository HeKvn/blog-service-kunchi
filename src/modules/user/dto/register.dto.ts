import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches } from "class-validator";
import { regPositive } from "src/utils/regex.util";

export class RegisterDTO {
  @ApiProperty({
    description: '手机号，唯一',
    example: '123'
  })
  @Matches(regPositive, { message: '请输入正确的手机号' })
  @IsNotEmpty({ message: '请输入手机号' })
  readonly mobile: string

  @ApiProperty({
    description: '用户名',
    example: '张三'
  })
  @IsNotEmpty({ message: '请输入用户昵称'})
  @IsString({ message: '名字必须是一串字符串' })
  readonly nickname: string

  @ApiProperty({
    description: '用户密码',
    example: '123456'
  })
  @IsNotEmpty({ message: '请输入密码' })
  readonly password: string

  @ApiProperty({
    description: '二次输入密码',
    example: '123456'
  })
  @IsNotEmpty({ message: '请再次输入密码' })
  readonly passwordRepeat: string
}
