import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Repository } from 'typeorm'
import { Category } from './entities/category.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto, id: number) {
    const isExist = await this.categoryRepo.findBy({
      user: { id },
      title: createCategoryDto.title,
    })
    if (isExist.length)
      throw new BadRequestException('This category already exists!')
    const newCategory = {
      title: createCategoryDto.title,
      user: {
        id,
      },
    }
    return await this.categoryRepo.save(newCategory)
  }

  async findAll(id: number) {
    return await this.categoryRepo.find({
      where: {
        user: {
          id,
        },
      },
      relations: {
        transactions: true,
      },
    })
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: {
        user: true,
        transactions: true,
      },
    })
    if (!category) throw new NotFoundException('Category Not Found')

    return category
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const isExist = await this.categoryRepo.findOne({
      where: { id },
    })
    if (!isExist) throw new NotFoundException('Category not found')

    await this.categoryRepo.update(id, updateCategoryDto)
    return await this.categoryRepo.findOne({
      where: { id },
    })
  }

  async remove(id: number) {
    // const isExist = await this.categoryRepo.findOne({
    //   where: { id },
    // })
    // if (!isExist) throw new NotFoundException('Category not found')

    return await this.categoryRepo.delete(id)
  }
}
