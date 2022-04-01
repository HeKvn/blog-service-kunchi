import { Common } from 'src/common/entity/common.entity';
import { Article } from 'src/modules/article/entity/article.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity()
export class Tag extends Common {
  @Column()
  label: string

  // 文章
  @ManyToMany((type) => Article, article => article.tags)
  articles: Article[]
}