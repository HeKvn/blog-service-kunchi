import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDTO } from 'src/common/dto/page.dto';
import { getPagination } from 'src/utils';
import { encryptFileMD5 } from 'src/utils/cryptogram.util';
import { Repository } from 'typeorm';
import { PictureCreateDTO } from './dto/picture-create.dto';
import { Picture } from './entity/picture.entity';
import { PictureInfoVO } from './vo/picture-info.vo';
import * as fs from 'fs'
import { uploadStaticSrc } from 'src/config/upload.config';

@Injectable()
export class PictureService {
  constructor (
    @InjectRepository(Picture)
    private readonly pictureRepository: Repository<Picture>
  ) {}

  async getMany (pageDto: PageDTO) {
    const { page, pageSize } = pageDto
    const getList = this.pictureRepository
      .createQueryBuilder('picture')
      .select([
        'picture.src'
      ])
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount()
    const [list, total] = await getList
    const pagination = getPagination(total, pageSize, page)

    return {
      list,
      pagination
    }
  }

  async create (pictureCreateDto: PictureCreateDTO): Promise<PictureInfoVO> {
    const picture = new Picture()
    picture.src = pictureCreateDto.src
    picture.sign = pictureCreateDto.sign
    const result = await this.pictureRepository.save(picture)
    return {
      info: result
    }
  }

  async getOneBySign (sign: string) {
    return await this.pictureRepository
      .createQueryBuilder('picture')
      .where('picture.sign = :sign', { sign })
      .getOne()
  }

  async upload (file: any) {
    const { buffer } = file
    const currentSign = encryptFileMD5(buffer)
    const hasPicture = await this.getOneBySign(currentSign)

    if (hasPicture) return {
      info: {
        src: hasPicture.src,
        isHas: true
      }
    }

    const arr = file.originalname.split('.')
    const fileType = arr[arr.length - 1]
    const fileName = currentSign + '.' + fileType
    fs.writeFileSync(`D:/Hekvn/mypicture/${fileName}`, buffer)

    const src = uploadStaticSrc + fileName

    this.create({ src, sign: currentSign })

    return {
      info: {
        src,
        isHas: false
      }
    }
  }
}
