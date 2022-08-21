import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikeService {

    constructor(
        private prisma: PrismaService
    ){}

    async likePost(
        data: {
        userId: number,
        postId: number,
        }
        
    ){
        const like = await this.prisma.postLike.findUnique({
            where: {
             userId_postId: data
            }
    })
    if(!like){
        return await this.prisma.postLike.create({data}).then(() => {
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
    commentId: number,
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
