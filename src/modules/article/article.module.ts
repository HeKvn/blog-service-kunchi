import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entity/article.entity';
import { Tag } from '../tag/entity/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, Tag])
  ],
  providers: [ArticleService],
  controllers: [ArticleController]
})
export class ArticleModule {}
