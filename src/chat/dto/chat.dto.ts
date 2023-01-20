import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export type ChatDto = {
  message: string;
  userId: string;
  groupId: string;
}

export class LimitQuery {

  @IsNotEmpty()
  @IsString()
  groupId: string;

  @IsInt()
  @Type(() => Number)
  start: number;

  @IsInt()
  @Type(() => Number)
  end: number;
}