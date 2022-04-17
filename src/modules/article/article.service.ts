import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleCreateDTO } from './dto/article-create.dto';
import { ArticleEditDTO } from './dto/article-edit.dto';
import { IdDTO } from './dto/id.dto';
import { ListDTO } from './dto/list.dto';
import { Article } from './entity/article.entity';
import { getPagination } from 'src/utils';
import { Tag } from '../tag/entity/tag.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ){}

  // 获取列表
  async getMore (listDTO: ListDTO) {
    const { page = 1, pageSize = 10 } = listDTO
    const getList = this.articleRepository
      .createQueryBuilder('article')
      .where({ isDelete: false })
      .leftJoin('article.tags', 'tag')
      .select([
        'article.id',
        'article.title', 
        'article.description',
        'article.createTime',
        'article.updateTime',
        'article.cover',
        'article.author'
      ])
      .addSelect([
        'tag.id',
        'tag.label'
      ])
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .orderBy('article.updateTime', 'DESC')
      .getManyAndCount()
    const [ list, total ] = await getList
    const pagination = getPagination(total, pageSize, page)
    return { list, pagination }
  }

  // 根据tag获取文章
  async getMoreByTagId (articleListDTO: ListDTO) {
    const { page = 1, pageSize = 10, tagId } = articleListDTO
    const getList = this.articleRepository
      .createQueryBuilder('article')
      .where({ isDelete: false })
      .andWhere('tag.id = :id', { id: tagId })
      .andWhere('tag.isDelete = :isDelete', { isDelete: false })
      .leftJoin('article.tags', 'tag')
      .select([
        'article.id',
        'article.title', 
        'article.description',
        'article.createTime',
        'article.updateTime',
        'article.cover',
        'article.author'
      ])
      .addSelect([
        'tag.id',
        'tag.label'
      ])
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount()
      const [ list, total ] = await getList
      const pagination = getPagination(total, pageSize, page)
      return { list, pagination }
  }

  // 获取单个
  async getOne (idDTO: IdDTO) {
    const { id } = idDTO
    const articleDetail = await this.articleRepository
      .createQueryBuilder('article')
      .where('article.id = :id and article.isDelete = false', { id },)
      .leftJoin('article.tags', 'tag')
      .addSelect([
        'tag.id',
        'tag.label'
      ])
      .getOne()
    if (!articleDetail) throw new NotFoundException('找不到文章')
    return { info: articleDetail }
  }

  // 创建文章
  async create (articleCreateDTO: ArticleCreateDTO) {
    const { title, tags } = articleCreateDTO
    const doc = await this.articleRepository.findOne({ where: { title } })
    if (doc) throw new HttpException('文章标题已存在', 404)
    const article = new Article()
    if (tags.length) {
      const list = []
      for (const item of tags) {
        const tag = await this.tagRepository.findOne({ where: { id: item } })
        if (tag) list.push(tag)
      }
      article.tags = list
    }
    article.title = title
    article.content = articleCreateDTO.content
    article.description = articleCreateDTO.description
    article.cover = articleCreateDTO.cover || ''
    article.author = 'HeKvn'
    const result = await this.articleRepository.save(article)
    return { info: result }
  }

  // 更新文章
  async update (articleEditDTO: ArticleEditDTO) {
    const { id, tags } = articleEditDTO
    let articleToUpdate = await this.articleRepository.findOne({ id })
    if (!articleToUpdate) throw new HttpException('无效的更新信息', 404)
    if (tags.length) {
      const tagList = []
      for (const item of tags) {
        const tag = await this.tagRepository.findOne({ where: { id: item } })
        if (tag) tagList.push(tag)
      }
      articleToUpdate.tags = tagList
    }
    articleToUpdate.content = articleEditDTO.content
    articleToUpdate.title = articleEditDTO.title
    articleToUpdate.description = articleEditDTO.description
    articleToUpdate.cover = articleEditDTO.cover || ''
    const result = await this.articleRepository.save(articleToUpdate)
    return { info: result }
  }

  // 删除文章
  async delete (idDTO: IdDTO) {
    const { id } = idDTO
    let articleToUpdate = await this.articleRepository.findOne({ id })
    articleToUpdate.isDelete = true
    const result = await this.articleRepository.save(articleToUpdate)
    return { info: result }
  }

  // 获取所有文章归档
  async getAllArticle () {
    const articleList = await this.articleRepository
    .createQueryBuilder('article')
    .where({ isDelete: false })
    .leftJoin('article.tags', 'tag')
    .select([
      'article.id',
      'article.title', 
      'article.createTime'
    ])
    .addSelect([
      'tag.id',
      'tag.label'
    ])
    .orderBy('article.createTime', 'DESC')
    .getManyAndCount()
    
    const [list, total] = articleList
    return {
      list,
      total
    }
  }
}
