import { ForbiddenException, Injectable, Post } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto, EditPostDto } from './dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async createPost(userId: number, dto: CreatePostDto) {
    const post = await this.prisma.post.create({
      data: {
        userId,
        ...dto,
      },
    });

    return post;
  }
  getAllPosts() {
    return this.prisma.post.findMany({
      select: {
        id: true,
        userId:true,
        title: true,
        body: true,
        _count: {select:{likes: true}},
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            id: true,
            message: true,
            parentId: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                fullName: true,
                _count: { select: { commentLike: true } },
              },
            },
          },
        },
      },
    });
  }
  getUserPosts(userId: number) {
    return this.prisma.post.findMany({
      where: {
        userId,
      },
      select: {
        title: true,
        body: true,
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            id: true,
            message: true,
            parentId: true,
            createdAt: true,
            userId: true,
            user: {
              select: {
                id: true,
                fullName: true,
                _count: { select: { postLikes: true } },
              },
            },
          },
        },
      },
    });
  }

  getPostById(userId: number, postId: string) {
    return this.prisma.post.findFirst({
      where: {
        userId,
        id: postId,
      },
      select: {
        title: true,
        body: true,
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            id: true,
            message: true,
            parentId: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                fullName: true,
                _count: { select: { postLikes: true } },
              },
            },
          },
        },
      },
    });
  }

  async editPostById(userId: number, dto: EditPostDto, postId: string) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post || post.userId !== userId)
      throw new ForbiddenException('Access to this resource is denied');

    return this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deletepostById(userId: number, postId: string) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post || post.userId !== userId)
      throw new ForbiddenException('Access to this resource is denied');
    await this.prisma.post.delete({
      where: {
        id: postId,
      },
    });
  }
}
