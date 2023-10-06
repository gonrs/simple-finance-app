import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Transaction } from './entities/transaction.entity'
import { Repository } from 'typeorm'

@Injectable()
export class TransactionService {
  async findAllByType(type: string, id: number) {
    const transactions = await this.transactionRepository.find({
      where: { type: type, user: { id } },
    })
    const total = transactions.reduce((acc, obj) => acc + obj.amount, 0)
    return total
  }
  async update(id: number, updateDto: UpdateTransactionDto) {
    const transaction = await this.transactionRepository.findOne({
      where: { id: id },
    })
    if (!transaction) throw new NotFoundException('Transaction not found')
    return await this.transactionRepository.update(id, updateDto)
  }
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
  async findOne(id: number) {
    const category = await this.transactionRepository.findOne({
      where: { id },
      relations: {
        user: true,
        category: true,
      },
    })
    if (!category) throw new NotFoundException('Category Not Found')

    return category
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
