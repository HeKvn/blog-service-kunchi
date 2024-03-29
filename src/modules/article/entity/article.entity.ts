import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Common } from 'src/common/entity/common.entity';
import { Tag } from 'src/modules/tag/entity/tag.entity';

@Entity()
export class Article extends Common {
  // 文章标题
  @Column('text')
  title: string

  // 文章描述
  @Column('text')
  description: string

  // 文章内容
  @Column('text')
  content: string

  // 文章封面
  @Column('text')
  cover: string

  // 作者
  @Column({ length: 255 })
  author: string

  // 标签
  @ManyToMany(type => Tag, tag => tag.articles)
  @JoinTable()
  tags: Tag[]
}
