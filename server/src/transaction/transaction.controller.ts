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
import { AuthorGuard } from 'src/guard/auth.guard'

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get(':type/find')
  @UseGuards(JwtAuthGuard)
  findAllByType(@Param('type') type: string, @Req() req) {
    return this.transactionService.findAllByType(type, req.user.id)
  }

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
  @Get(':type/findone/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id)
  }
  @Patch(':type/update/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  update(@Param('id') id: string, @Body() updateDto: UpdateTransactionDto) {
    return this.transactionService.update(+id, updateDto)
  }

  @Delete(':type/delete/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id)
  }

  @Get(':type/getpaginations')
  @UseGuards(JwtAuthGuard, AuthorGuard)
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
