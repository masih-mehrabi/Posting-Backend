import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCommentDto {
    @IsString()
    @IsNotEmpty()
    message: string

    @IsNotEmpty()
    postId: string
}