import { ArrayNotEmpty, IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateEventBookingGroupDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsOptional()
  attending_students?: string[];
}
