import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './modules/article/article.module';
import { UserModule } from './modules/user/user.module';
import { TagModule } from './modules/tag/tag.module';
import { PictureModule } from './modules/picture/picture.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '175.178.9.4',
      port: 3306,
      username: 'hk01',
      password: 'hklmc123',
      database: 'test',
      // entities: ['dist/modules/**/*.entity{.ts,.js}'],
      autoLoadEntities: true, // 自动加载我们的实体,每个通过forFeature()注册的实体都会自动添加到配置对象的entities数组
      synchronize: true
    }),
    ArticleModule,
    UserModule,
    TagModule,
    PictureModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
