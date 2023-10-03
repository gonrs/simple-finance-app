import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Transaction } from './entities/transaction.entity'
import { Repository } from 'typeorm'

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, id: number) {
    const newTransaction = {
      title: createTransactionDto.title,
      amount: createTransactionDto.amount,
      type: createTransactionDto.type,
      category: { id: +createTransactionDto.category },
      user: { id },
    }

    if (!newTransaction)
      throw new BadRequestException('Can`t create a new transaction')
    // return newTransaction
    return await this.transactionRepository.save(newTransaction)
  }

  async findAll(id: number) {
    const transaction = await this.transactionRepository.find({
      where: { user: { id } },
      order: {
        createdAt: 'DESC',
      },
    })
    if (!transaction) throw new BadRequestException('Transactions not found')
    return transaction
  }

  async remove(id: number) {
    return this.transactionRepository.delete(id)
  }
  async findAllWhitPagination(id: number, page: number, limit: number) {
    const transaction = await this.transactionRepository.find({
      where: {
        user: { id },
      },
      relations: {
        category: true,
        user: true,
      },
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      skip: (page - 1) * limit,
    })
    return transaction
  }
}
