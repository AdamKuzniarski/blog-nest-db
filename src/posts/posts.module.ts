import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PublicController } from './controllers/public.controller';
import { AdminController } from './controllers/admin.controller';

@Module({
  providers: [PostsService],
  controllers: [PublicController, AdminController]
})
export class PostsModule {}
