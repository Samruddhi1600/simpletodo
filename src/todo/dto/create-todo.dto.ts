import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';


export class CreateTodoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  task: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;
}

// function IsOptional(target: CreateTodoDto, propertyKey: 'description'): void {
//   throw new Error('Function not implemented.');
// }
