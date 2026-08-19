import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateEventBookingGroupDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  id_booking!: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  id_group!: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  attending_students!: string[];
}
