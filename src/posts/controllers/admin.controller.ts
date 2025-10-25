import { Controller, Body, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PostsService } from '../posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import{ UpdatePostDto } from '../dto/update-post.dto';



@Controller('admin')
export class AdminController {
    constructor(private readonly postsService: PostsService) {}

@Get()
getAllAdminPosts() {
    return this.postsService.findAllAdmin();
}
@Get(':id')
getOneAdminPost(@Param('id', ParseIntPipe) id: number){
return this.postsService.findOneByIdAdmin(id)
}
}