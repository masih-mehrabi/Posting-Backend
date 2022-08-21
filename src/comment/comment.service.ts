import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto, EditCommentDto } from './dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async createComment(dto: CreateCommentDto, userId: number, postId: number) {
    const comment = await this.prisma.comment.create({
      data: {
        ...dto,
        userId,
        postId,
      },
    });
    return comment;
  }

  async editComment(
    dto: EditCommentDto,
    userId: number,
    postId: number,
    commentId: number,
  ) {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!comment || comment.userId != userId) {
      throw new ForbiddenException(
        'You do not have the persmission to perform this operation',
      );
    }
    return this.prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        ...dto,
        postId: postId,
      },
    });
  }

  async deleteCommentById(userId: number, commentId: number) {
    const comment = await this.prisma.post.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!comment || comment.userId !== userId)
      throw new ForbiddenException('Access to this resource is denied');
    await this.prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
  }
}
