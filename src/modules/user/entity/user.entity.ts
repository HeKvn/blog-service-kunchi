import { Column, Entity } from 'typeorm';
import { Common } from 'src/common/entity/common.entity';

@Entity()
export class User extends Common {
  @Column('text')
  nickname: string

  @Column('text')
  mobile: string

  // 加密后的密码
  @Column('text', { select: false })
  password: string

  // 加密盐
  @Column('text', { select: false })
  salt: string
}
