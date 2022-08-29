import { Injectable } from '@nestjs/common';
import { userInfo } from 'os';
import { PrismaService } from 'src/prisma/prisma.service';
import { LikeDto } from './dto/like.dto';

@Injectable()
export class LikeService {

    constructor(
        private prisma: PrismaService
    ){}

    async likePost(
    //     userId: number,
    //    postId: string
        data: {
        userId
        postId
      }
        
    ){
      
        // const Post = this.prisma.post.findUnique({
        //     where:{
        //         id: postId
        //     }
    
        // })
        const like = await this.prisma.postLike.findUnique({
            where: {
             userId_postId: data
            }
    })
    if(!like){
        return await this.prisma.postLike.create({
            data
        }).then(() => {
            return {addPostLike: true}
        })
    } else {
        return await this.prisma.postLike.delete({
            where: {
                userId_postId: data
            }
        }).then(()=> {
            return {addPostLike: false}
        })
    }
    
}

async likeComment(
    data: {
    userId: number,
    commentId: string,
    }

){
    const like = await this.prisma.commentLike.findUnique({
        where: {
            userId_commentId: data
        }
})
if(!like){
    return await this.prisma.commentLike.create({data}).then(() => {
        return {addCommentLike: true}
    })
} else {
    return await this.prisma.commentLike.delete({
        where: {
            userId_commentId: data
        }
    }).then(()=> {
        return {addCommentLike: false}
    })
}

}


    
}
