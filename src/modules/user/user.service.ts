import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram.util';
import { Repository } from 'typeorm';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { User } from './entity/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ){}

  // 校验注册信息
  async checkRegisterForm (registerDTO: RegisterDTO) {
    if (registerDTO.password !== registerDTO.passwordRepeat) throw new NotFoundException('两次输入的密码不一致')
    const { mobile } = registerDTO
    const hasUser = await this.userRepository.findOne({ mobile })
    if (hasUser) throw new NotFoundException('用户已存在')
  }

  // 注册
  async register (registerDTO: RegisterDTO): Promise<any> {
    await this.checkRegisterForm(registerDTO)

    const { nickname, password, mobile } = registerDTO
    const salt = makeSalt() // 制作盐
    const hashPassword = encryptPassword(password, salt)

    const newUser = new User()
    newUser.nickname = nickname
    newUser.mobile = mobile
    newUser.password = hashPassword
    newUser.salt = salt

    const result = await this.userRepository.save(newUser)
    delete result.password
    delete result.salt
    return {
      info: result
    }
  }

  // 校验登录
  async checkLoginForm (loginDTO: LoginDTO) {
    const { mobile, password } = loginDTO
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.salt')
      .addSelect('user.password')
      .where('user.mobile = :mobile', { mobile })
      .getOne()
    
    if (!user) throw new NotFoundException('用户不存在')
    const { password: dbPassword, salt } = user
    const currentHashPassword = encryptPassword(password, salt)
    if (currentHashPassword !== dbPassword) throw new NotFoundException('密码错误')

    return user
  }

  // 生成token
  async certificate (user: User) {
    const payload = {
      id: user.id,
      nickname: user.nickname,
      mobile: user.mobile
    }
    const token = this.jwtService.sign(payload)
    return token
  }

  // 登录
  async login (loginDTO: LoginDTO) {
    const user = await this.checkLoginForm(loginDTO)
    const token = await this.certificate(user)
    // return {
    //   info: {
    //     token
    //   }
    // }
    return {token}
  }
}
