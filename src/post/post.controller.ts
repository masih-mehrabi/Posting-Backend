import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtGuard } from '../auth/guard';
import { CreatePostDto, EditPostDto } from './dto';
import { PostService } from './post.service';

@UseGuards(JwtGuard)
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('create')
  createPost(@GetUser('id') userId: number, @Body() dto: CreatePostDto) {
    return this.postService.createPost(userId, dto);
  }

  @Get('all-user-posts')
  getUserPosts(@GetUser('id') userId: number) {
    return this.postService.getUserPosts(userId);
  }
  @Get('all-posts')
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get(':id')
  getPostById(
    @GetUser('id') userId: number,
    @Param('id') postId: string,
  ) {
    return this.postService.getPostById(userId, postId);
  }

  @Patch(':id')
  editBookmarkById(
    @GetUser('id') userId: number,
    @Param('id') postId: string,
    @Body() dto: EditPostDto,
  ) {
    return this.postService.editPostById(userId, dto, postId);
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deletePostById(
    @GetUser('id') userId: number,
    @Param('id') postId: string,
  ) {
    return this.postService.deletepostById(userId, postId);
  }
  @Post('get-user-id')
  async returnUserId(
    @GetUser('id') userId : number
  ) {
    return userId
  }
}
