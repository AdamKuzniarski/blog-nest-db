import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from '../entity/posts/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
  ) {}

  async findAllPublic(): Promise<PostEntity[]> {
    return this.postsRepository.find({ where: { isPublished: true } });
  }

  async findOneByIdPublic(id: number): Promise<PostEntity> {
    const foundPost = await this.postsRepository.findOne({
      where: { id, isPublished: true },
    });
    if (!foundPost) {
      throw new NotFoundException('Post not found or not published');
    }
    return foundPost;
  }

  async findAllAdmin(): Promise<PostEntity[]> {
    return this.postsRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOneByIdAdmin(id: number): Promise<PostEntity> {
    const foundPost = await this.postsRepository.findOne({ where: { id } });
    if (!foundPost) {
      throw new NotFoundException('Post not found');
    }
    return foundPost;
  }

  async createOne(createPostDto: CreatePostDto): Promise<PostEntity> {
    const newPost = this.postsRepository.create(createPostDto);
    return this.postsRepository.save(newPost);
  }

  async updateOneById(
    id: number,
    updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
    const existignPost = await this.findOneByIdAdmin(id);
    Object.assign(existignPost, updatePostDto);
    return this.postsRepository.save(existignPost);
  }

  async deleteOneById(id: number): Promise<{ deleted: true }> {
    const deleteResult = await this.postsRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException('Post not found');
    }
    return { deleted: true };
  }
}
