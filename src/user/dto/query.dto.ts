import { ApiProperty } from '@nestjs/swagger'
export class QueryDto{
@ApiProperty({type:Number , description:'limit'})
limit?:number;
@ApiProperty({type:Number , description:'page'})
page?:number;

}