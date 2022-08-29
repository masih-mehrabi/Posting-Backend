import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
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

  @Post('create')
  async createComment(
    @GetUser('id') userId: number,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentService.createComment(dto, userId);
  }
  @Patch(':id')
  async editComment(
    @GetUser('id') userId: number,
    @Body() dto: EditCommentDto,
    @Param('id') commentId: string,
  ) {
    return this.commentService.editComment(dto, userId, commentId);
  }


  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteCommentById(
    @GetUser('id') userId: number,
    @Param('id') commentId: string,
  ) {
    return this.commentService.deleteCommentById(userId, commentId);
  }

  // @Post('getuserId')

}
