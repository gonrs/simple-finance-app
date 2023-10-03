import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common'
import { TransactionService } from './transaction.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() CreateTransactionDto: CreateTransactionDto, @Req() req) {
    return this.transactionService.create(CreateTransactionDto, +req.user.id)
  }

  @Get('findall')
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.transactionService.findAll(+req.user.id)
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id)
  }

  @Get('getpaginations')
  @UseGuards(JwtAuthGuard)
  findAllWithPagination(
    @Req() req,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.transactionService.findAllWhitPagination(
      +req.user.id,
      +page,
      +limit,
    )
  }
}
