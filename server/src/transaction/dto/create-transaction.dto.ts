import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { Category } from 'src/category/entities/category.entity'
import { User } from 'src/user/entities/user.entity'

export class CreateTransactionDto {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  @IsNumber()
  amount: number

  @IsString()
  type: 'expence' | 'income'

  @IsNotEmpty()
  category: Category

  // @IsNotEmpty()
  @IsOptional()
  user?: User
}
