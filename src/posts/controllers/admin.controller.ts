import { Controller, Body, Delete, Get, Param, ParseIntPipe, Post, Patch } from '@nestjs/common';
import { PostsService } from '../posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import{ UpdatePostDto } from '../dto/update-post.dto';



@Controller('admin/posts')
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

@Post()
createOneAdminPost(@Body() createPostDto: CreatePostDto){
    return this.postsService.createOne(createPostDto)
}

@Patch(':id')
updateOneAdminPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto){
    return this.postsService.updateOneById(id, updatePostDto)
}

@Delete(':id')
deleteOneAdminPost(@Param('id', ParseIntPipe) id: number){
    return this.postsService.deleteOneById(id)
}

}