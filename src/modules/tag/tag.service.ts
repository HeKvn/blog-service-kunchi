import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IdDTO } from '../article/dto/id.dto';
import { TagCreateDTO } from './dto/tag-create.dto';
import { TagUpdateDTO } from './dto/tag-update.dto';
import { Tag } from './entity/tag.entity';
import { TagInfoVO } from './vo/tag-info.vo';
import { TagListVO } from './vo/tag-list.vo';

@Injectable()
export class TagService {
  constructor (
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ) {}

  async getMore (): Promise<TagListVO> {
    const getList = this.tagRepository
      .createQueryBuilder('tag')
      .where({ isDelete: false })
      .select([
        'tag.id',
        'tag.label'
      ])
      .getMany()
    const result = await getList
    return {
      list: result
    }
  }

  async create (tagCreatDTO: TagCreateDTO): Promise<TagInfoVO> {
    const { label } = tagCreatDTO
    const hasTag = await this.tagRepository.findOne({ label })
    if (hasTag) throw new NotFoundException(`${label}标签已存在`)
    const tag = new Tag()
    tag.label = label
    const result = await this.tagRepository.save(tag)
    return {
      info: result
    }
  }

  async update (tagUpdateDTO: TagUpdateDTO): Promise<TagInfoVO> {
    const { id, label } = tagUpdateDTO
    const tag = await this.tagRepository.findOne({ id })
    tag.label = label
    const result = await this.tagRepository.save(tag)
    return {
      info: result
    }
  }

  async remove (idDTO: IdDTO) {
    const { id } = idDTO
    const tag = await this.tagRepository.findOne({ id })
    tag.isDelete = true
    const result = await this.tagRepository.save(tag)
    return {
      info: result
    }
  }
}
