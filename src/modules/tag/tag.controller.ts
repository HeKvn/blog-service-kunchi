import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IdDTO } from '../article/dto/id.dto';
import { TagCreateDTO } from './dto/tag-create.dto';
import { TagUpdateDTO } from './dto/tag-update.dto';
import { TagService } from './tag.service';
import { TagInfoSuccessVO, TagInfoVO } from './vo/tag-info.vo';
import { TagListSuccessVO, TagListVO } from './vo/tag-list.vo';

@ApiTags('标签模块')
@Controller('tag')
export class TagController {
  constructor (
    private tagService: TagService
  ) {}
  
  @ApiOkResponse({ description: '标签列表', type: TagListSuccessVO })
  @Get()
  getMore (): Promise<TagListVO> {
    return this.tagService.getMore()
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiCreatedResponse({ description: '创建标签', type: TagInfoSuccessVO })
  @Post()
  create (@Body() tagCreateDTO: TagCreateDTO): Promise<TagInfoVO> {
    return this.tagService.create(tagCreateDTO)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiCreatedResponse({ description: '编辑标签', type: TagInfoSuccessVO })
  @Put()
  update (@Body() tagUpdateDTO: TagUpdateDTO): Promise<TagInfoVO> {
    return this.tagService.update(tagUpdateDTO)
  }

  @Delete(':id')
  remove (@Param() idDTO: IdDTO): Promise<TagInfoVO> {
    return this.tagService.remove(idDTO)
  }
}
