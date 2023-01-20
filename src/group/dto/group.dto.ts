import { IsNotEmpty, IsString } from 'class-validator';

export class GroupCreatorDto {

  @IsString()
  @IsNotEmpty()
  groupName: string;
}