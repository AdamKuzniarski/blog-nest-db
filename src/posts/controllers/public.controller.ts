import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PostsService } from '../posts.service';

@Controller('public/posts')
export class PublicController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAllPublic() {
    return this.postsService.findAllPublic();
  }

  @Get(':id')
  async findOneByIdPublic(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOneByIdPublic(id);
  }
}
