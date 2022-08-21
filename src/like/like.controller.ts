import { Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService) {}

  @Post('post')
  likePost(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) postId: number,
  ) {
    const data = {
      userId,
      postId,
    };

    return this.likeService.likePost(data);
  }

  @Post('comment')
  likeComment(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) commentId: number,
  ) {
    const data = {
      userId,
      commentId,
    };

    return this.likeService.likeComment(data);
  }
}
