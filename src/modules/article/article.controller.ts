import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { ArticleCreateDTO } from './dto/article-create.dto';
import { ArticleEditDTO } from './dto/article-edit.dto';
import { IdDTO } from './dto/id.dto';
import { ListDTO } from './dto/list.dto';
import { ArticleInfoResponse } from './vo/article-info.vo';
import { ArticleListResponse } from './vo/article-list.vo';

@ApiTags('文章模块')
@Controller('article')
export class ArticleController {
  constructor(
    private articleService: ArticleService
  ){}

  @Get()
  @ApiOkResponse({ description: '文章列表', type: ArticleListResponse })
  getMore (@Query() listDTO: ListDTO) {
    const { tagId } = listDTO
    if (tagId) return this.articleService.getMoreByTagId(listDTO)
    return this.articleService.getMore(listDTO)
  }

  @ApiOkResponse({ description: '获取所有文章列表归档', type: ArticleListResponse })
  @Get('all')
  getAllArticleList () {
    return this.articleService.getAllArticle()
  }

  @Get(':id')
  @ApiOkResponse({ description: '文章详情', type: ArticleInfoResponse })
  getOne (@Param() idDTO: IdDTO) {
    return this.articleService.getOne(idDTO)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiBearerAuth()
  @ApiOkResponse({ description: '创建文章', type: ArticleInfoResponse })
  create (@Body() articleCreateDTO: ArticleCreateDTO) {
    return this.articleService.create(articleCreateDTO)
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  @ApiBearerAuth()
  @ApiOkResponse({ description: '编辑文章', type: ArticleInfoResponse })
  update (@Body() articleEditDTO: ArticleEditDTO) {
    return this.articleService.update(articleEditDTO)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: '删除文章', type: ArticleInfoResponse })
  delete (@Param() idDTO: IdDTO) {
    return this.articleService.delete(idDTO)
  }
}
