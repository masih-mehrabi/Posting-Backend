import { Body, Controller, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtGuard } from 'src/auth/guard';
import { LikeDto } from './dto/like.dto';
import { LikeService } from './like.service';


@UseGuards(JwtGuard)
@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService) {}

  @Post('post/:postId')
  async likePost(
    @GetUser('id') userId: number,
    @Param('postId') postId: string

  ) {
    const data = {
      userId,
      postId
    }
    

    return this.likeService.likePost(data);
    
  }

  @Post('comment/:commentId')
  likeComment(
    @GetUser('id') userId: number,
    @Param('commentId') commentId: string,
  ) {
    const data = {
      userId,
      commentId,
    };

    return this.likeService.likeComment(data);
  }


}



