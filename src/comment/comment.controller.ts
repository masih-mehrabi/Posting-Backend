import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtGuard } from 'src/auth/guard';
import { CommentService } from './comment.service';
import { CreateCommentDto, EditCommentDto } from './dto';

@UseGuards(JwtGuard)
@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}
  @Post()
  async createComment(
    @GetUser('id') userId: number,
    @Body() dto: CreateCommentDto,
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    return this.commentService.createComment(dto, postId, userId);
  }
  @Patch(':id')
  async editComment(
    @GetUser('id') userId: number,
    @Body() dto: EditCommentDto,
    @Param('postId', ParseIntPipe) postId: number,
    @Param('id', ParseIntPipe) commentId: number,
  ) {
    return this.commentService.editComment(dto, userId, postId, commentId);
  }

  @Delete(':id')
  async deleteComment(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) commentId: number,
  ) {
    return this.commentService.deleteCommentById(userId, commentId);
  }
}
