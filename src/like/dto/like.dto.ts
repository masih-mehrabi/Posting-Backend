import { IsNotEmpty, IsSemVer, IsString } from "class-validator";


export class LikeDto {
    @IsNotEmpty()
    // @IsString()
    
        
        postId: string
    
}