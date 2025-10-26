import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'src/entity/posts/post.entity';
import { PostsService } from './posts.service';
import { PublicController } from './controllers/public.controller';
import { AdminController } from './controllers/admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  providers: [PostsService],
  controllers: [PublicController, AdminController],
  exports: [PostsService],
})
export class PostsModule {}
